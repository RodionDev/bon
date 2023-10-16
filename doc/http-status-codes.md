# Formal HTTP Status Codes
Sorry if we broke your codes.
```
Status code  Functions
1XX Informational
100 Continue #   `authT`
101 Switching Protocols
102 Processing
103 Early Hints
2XX Successful
200 OK # `readT`   `listT`
201 Created # `takeupT`  `takeonT`
202 Accepted # `updateT`
203 Non-Authoritative Information
204 No Content
205 Reset Content
206 Partial Content
207 Multi-Status
208 Already Reported  # `pingT`
226 IM Used
3XX Redirection
300 Multiple Choices
301 Moved Permanently # `unlistT`
302 Found (Previously: Moved Temporarily)   # `enlistT`
303 See Other
304 Not Modified
305 (Unused) Previously: Use Proxy
306 (Unused) Previously: Switch Proxy
307 Temporary Redirect
308 Permanent Redirect  # `destroyT` to `disengage list` and return new home.
4XX Client Error
400 Bad Request
401 Unauthorized    # `authT`
402 Payment Required
403 Forbidden    # `permitT`
404 Not Found   # `engageT`
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 URI Too Long
415 Unsupported Media Type
416 Range Not Satisfiable
417 Expectation Failed # `otherRibsT`
418 (Unused) Previously: I’m a Teapot
421 Misdirected Request
422 Unprocessable Entity
423 Locked
424 Failed Dependency
425 Too Early
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
451 Unavailable for Legal Reasons
5XX Server Error
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 (Unused) Not Extended
511 Network Authentication Required
```
