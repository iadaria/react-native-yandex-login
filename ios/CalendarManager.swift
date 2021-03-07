//
//  CalendarManager.swift
//  test_feauters
//
//  Created by Daria Iakimova on 07.03.2021.
//

import Foundation

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  @objc
  func addEvent(_ name: String,
                location: String,
                resolver resolve: RCTPromiseResolveBlock,
                rejecter reject: RCTPromiseRejectBlock) -> Void {
    resolve("Hellow Word! All OK!")
    print("!!! You entered data: name = \(name) and location = \(location)")
  }
  
  
  @objc
  func constantsToExport() -> [String: Any]! {

    return ["SOME_CONST": "Some value"]
  }
  
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true;
  }
}
