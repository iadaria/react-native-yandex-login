import YandexLoginSDK

@objc(YandexLogin)
class YandexLogin: NSObject{
    let code = "Yandex_login"
    var resolver: RCTPromiseResolveBlock!
    var rejecter: RCTPromiseRejectBlock!

    override init() {
        super.init()
        
        print("*** init ***")
        
        guard let clientId = Bundle.main.object(forInfoDictionaryKey: "ClientID") else {
            print("The ClientID is empty")
            return
        }
        
        do {
            try YandexLoginSDK.shared.activate(with: clientId as! String)
        } catch {
            print("Error:", "Couldn't activte Yandex Login SDK: ", error)
        }
        
        YandexLoginSDK.shared.add(observer: self)
    }
    
    @objc
    func login(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void{

        self.resolver = resolve
        self.rejecter = reject
      
        let storyboard = UIStoryboard(name: "LaunchScreen", bundle: nil)
        guard let viewController = storyboard.instantiateInitialViewController() else {
            reject(code, "Can't get a viewController", NSError())
            return
        }
      
        DispatchQueue.main.async {
            do {
                try YandexLoginSDK.shared.authorize(with: viewController)
            } catch {
                self.rejecter!(self.code, "Yandex authorize fails:", error)
            }
        }
    }
}

extension YandexLogin: YandexLoginSDKObserver {
  func didFinishLogin(with result: Result<LoginResult, Error>) {
    switch result {
    case .success(let loginResult):
      self.resolver(["token": loginResult.token])
    case .failure(let error):
      self.rejecter(self.code, "yandex login fails", error)
    }
  }
}
