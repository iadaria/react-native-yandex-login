// CalendarManager.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name
                  location:(NSString *)location
                  resolver:(RCTPromiseResolveBlock) resolve
                  rejecter:(RCTPromiseRejectBlock) reject)

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
