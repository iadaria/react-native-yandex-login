#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(YandexLogin, NSObject)

RCT_EXTERN_METHOD(login:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
