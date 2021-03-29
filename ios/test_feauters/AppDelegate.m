#import "AppDelegate.h"

#if __has_include(<VKSdkFramework/VKSdkFramework.h>)
#import <VKSdkFramework/VKSdkFramework.h>
#else
#import "VKSdk.h"
#endif

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <YandexLoginSDK/YandexLoginSDK.h>
#import <GoogleMaps/GoogleMaps.h>
#import "baniking_mobile-Swift.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

#define IS_IOS11orHIGHER ([[[UIDevice currentDevice] systemVersion] floatValue] >= 11.0)
#define IS_IOS8orLOWER ([[[UIDevice currentDevice] systemVersion] floatValue] <= 8.0)
#define IS_IOS9orLOWER ([[[UIDevice currentDevice] systemVersion] floatValue] > 8.0 && [[[UIDevice currentDevice] systemVersion] floatValue] <= 9.0)

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
#if RCT_DEV
  [bridge moduleForClass:[RCTDevLoadingView class]];
#endif
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"baniking_mobile"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // added by Daria
  /** Замените код в AppDelegate следующим. Он инициализирует SDK при запуске приложения и позволяет SDK обрабатывать результаты, полученные из нативного приложения Facebook при входе или публикации. */
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  [GMSServices provideAPIKey:@"AIzaSyAMDDBBRDBRkGsqyUP58_iZ_V5QFWwlRVc"]; // add by Daria for google map
  
  NSString *clientId = @"707f8fd9b4cf43ea846143b487d73c45";
  NSError *error;
  @try {
    BOOL resultActivate = [YandexLogin activateWithAppId:clientId error:nil];
    NSLog(resultActivate ? @"YES!!! YXLSdk is initialized" : @"NO YXSdk isn't initialized");
  }
  
  @catch ( NSException *e ) {
    NSLog(@"%@", e);
    NSLog(@"%@ Error from ", error);
  }
  
  return YES;
}


//iOS 9 workflow
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *,id> *)options {
    [VKSdk processOpenURL:url fromApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]];
    [[FBSDKApplicationDelegate sharedInstance] application:app
                                                   openURL:url
                                                   options:options];
    return [YandexLogin handleOpen:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]];
    // return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  // return [CodePush bundleURL]; // replace by daria for codepush work
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            sourceApplication:(NSString *)sourceApplication
            annotatioin:(id)annotation
{
  // return [[YXLSdk shared] handleOpenURL:url sourceApplication:sourceApplication];
  return [YandexLogin handleOpen:url sourceApplication:sourceApplication];
}

#ifdef IS_IOS8orLOWER
- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> *restorableObjects))restorationHandler {
  [YandexLogin processUserActivity:userActivity];
  return YES;
}
#endif


@end
