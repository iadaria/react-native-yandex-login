//
//  CalendarManager.swift
//  test_feauters
//
//  Created by Daria Iakimova on 07.03.2021.
//

import Foundation
import When

@objc(CalendarManager)
class CalendarManager: NSObject, YandexLoginProcessing, YandexLoginSdkProcessing {
  private let clientId = "707f8fd9b4cf43ea846143b487d73c45"
  private let yandexLoginService = YandexLoginProcessingAssembly.makeService()
  private var myPromiseResolve: RCTPromiseResolveBlock? = nil
  private var myPromiseReject: RCTPromiseRejectBlock? = nil
  
  @objc
  func addEvent(_ name: String,
                location: String,
                resolver resolve: @escaping RCTPromiseResolveBlock,
                rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    
    // resolve("Hellow Word! All OK!")
    myPromiseResolve = resolve;
    myPromiseReject = reject;
    print("!!! You entered data: name = \(name) and location = \(location)")
    
    let _ = self.authorize()
    // let promise = self.authorize()
    /*promise.done({ value in
      resolve(value.token)
      print("!!! Done \(value)")
    })*/
    
    /*promise.fail({ error in
      reject("E_ERROR", "active don't execute. Fack you off", error)
      print("!!! Error \(error)")
    })*/
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {

    return ["SOME_CONST": "Some value"]
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true;
  }
  
  @objc
  public static func activate(withAppId appId: String) throws {
      try YXLSdk.shared.activate(withAppId: appId)
  }
  
  @objc
  public static func processUserActivity(_ userActivity: NSUserActivity) {
      YXLSdk.shared.processUserActivity(userActivity)
  }
  
  @objc
  public static func handleOpen(_ url: URL, sourceApplication: String?) -> Bool {
      return YXLSdk.shared.handleOpen(url, sourceApplication: sourceApplication)
  }
  
  private var observer: Observer? {
      didSet {
          oldValue?.promise.reject(YandexLoginProcessingError.wasCanceled)
          oldValue.map(YXLSdk.shared.remove)
          observer.map(YXLSdk.shared.add)
      }
  }

  func authorize() -> Promise<YandexLoginResponse> {
      subscribeOnNotifications()

      let observer = Observer(self.myPromiseResolve, self.myPromiseReject)
      self.observer = observer
      YXLSdk.shared.authorize()
      return observer.promise
  }
  
  private func subscribeOnNotifications() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(applicationDidBecomeActive),
                                               name: UIApplication.didBecomeActiveNotification,
                                               object: nil)
    }

  private func unsubscribeFromNotifications() {
      NotificationCenter.default.removeObserver(self)
  }

  @objc
  private func applicationDidBecomeActive() {
      unsubscribeFromNotifications()
      observer?.promise.reject(YandexLoginProcessingError.applicationDidBecomeActive)
  }
  
  func this() -> CalendarManager {
    return self
  }

  func logout() {
      YXLSdk.shared.logout()
  }
  
  private final class Observer: NSObject, YXLObserver {
      var promise = Promise<YandexLoginResponse>()
    private var _resolve: RCTPromiseResolveBlock? = nil
    private var _reject: RCTPromiseRejectBlock? = nil
    
    init(_ resolve: RCTPromiseResolveBlock?,
         _ reject: RCTPromiseRejectBlock?) {
      _resolve = resolve
      _reject = reject
    }

      func loginDidFinish(with result: YXLLoginResult) {
        if (_resolve != nil) {
          _resolve!(result.token)
        }
        promise.resolve(makeYandexLoginResponse(result))
      }

      func loginDidFinishWithError(_ error: Error) {
        if (_reject != nil) {
          _reject!("E_ERROR", "active don't execute. Fack you off", error)
        }
          promise.reject(makeError(error))
      }

      private func makeError(_ error: Error) -> YandexLoginProcessingError {
          let resultError: YandexLoginProcessingError

          if (error as NSError).code == YXLErrorCode.denied.rawValue {
              resultError = .accessDenied
          } else {
              resultError = .common(error)
          }

          return resultError
      }
  }
}

private func makeYandexLoginResponse(_ result: YXLLoginResult) -> YandexLoginResponse {
    return YandexLoginResponse(token: result.token, displayName: makeDisplayNameFromJwt(result.jwt))
}

// MARK: - Decoding JWT

private func makeDisplayNameFromJwt(_ jwt: String) -> String? {

    let requiredJwtCount = 3
    let payloadJwtFragment = 1
    let displayNameKey = "display_name"

    let components = jwt.components(separatedBy: ".")

    guard components.count == requiredJwtCount,
          let data = base64UrlDecode(components[payloadJwtFragment]),
          let json = try? JSONSerialization.jsonObject(with: data),
          let payloadJson = json as? [String: Any],
          let dispayName = payloadJson[displayNameKey] as? String else {
        return nil
    }

    return dispayName
}

private func base64UrlDecode(_ value: String) -> Data? {

    var base64 = value
        .replacingOccurrences(of: "-", with: "+")
        .replacingOccurrences(of: "_", with: "/")

    let length = Double(base64.lengthOfBytes(using: String.Encoding.utf8))
    let requiredLength = 4 * ceil(length / 4.0)
    let paddingLength = requiredLength - length

    if paddingLength > 0 {
        let padding = "".padding(toLength: Int(paddingLength), withPad: "=", startingAt: 0)
        base64 += padding
    }

    return Data(base64Encoded: base64, options: .ignoreUnknownCharacters)
}
