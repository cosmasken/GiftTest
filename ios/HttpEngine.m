//
//  HttpEngine.m
//  GiftTest
//
//  Created by Cosmas on 27/04/2023.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(HttpEngine,NSObject)

RCT_EXTERN_METHOD(request:(NSString *)url
                  method:(NSString *)method
                  body:(NSString *)body
                  headers:(NSDictionary *)headers
                  callback:(RCTResponseSenderBlock)callback)


@end
