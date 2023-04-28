//
//  HttpEngine.swift
//  GiftTest
//
//  Created by Cosmas on 27/04/2023.
//

import Foundation
@objc(HttpEngine)
class HttpEngine:NSObject{
  
  @objc func request(_ url: String, method: String, body: String, headers: [String: String], callback: @escaping (String?, String?) -> ()) {
      let requestURL = URL(string: url)!
      var request = URLRequest(url: requestURL)
      request.httpMethod = method
      request.httpBody = body.data(using: .utf8)
      
      for (key, value) in headers {
        request.addValue(value, forHTTPHeaderField: key)
      }
      
      let session = URLSession.shared
      let task = session.dataTask(with: request, completionHandler: { data, response, error in
        if let error = error {
          callback(nil, error.localizedDescription)
          return
        }
        
        guard let data = data else {
          callback(nil, "No data returned")
          return
        }
        
        let responseBody = String(data: data, encoding: .utf8)!
        callback(responseBody, nil)
      })
      
      task.resume()
    }
  
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  }
