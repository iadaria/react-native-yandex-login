//
//  YandexLoginBridge.m
//  baniking_mobile
//
//  Created by Daria Iakimova on 19.03.2021.
//

// #import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(YandexLogin, NSObject)

RCT_EXTERN_METHOD(login:(NSString *)email
                  resolver:(RCTPromiseResolveBlock) resolve
                  rejecter:(RCTPromiseRejectBlock) reject)

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSDictionary *)constantsToExport
{
  return @{ @"DEFAULT_EVENT_NAME": @"New Event" };
}


@end
