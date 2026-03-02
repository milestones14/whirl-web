# Whirl Web

Whirl random number generator for non-CLI environments

## How to use
Make a POST request to `https://whirl-web.onrender.com`:

> [!TIP]
> These examples generate a standard 0-1 random float, but if you want to generate a 32-char string (as available in the CLI), just change the endpoint from '/generate' to '/generateString'

### cURL
```bash
curl -X POST https://whirl-web.onrender.com/generate \
  -H "Content-Type: application/json"
```

### JavaScript
```js
const res = await fetch("https://whirl-web.onrender.com/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
});

const json = await res.json();
console.log("Value:", json.value);
```

### Python
```python
import requests

r = requests.post(
    "https://whirl-web.onrender.com/generate",
    headers={
        "Content-Type": "application/json"
    }
)

data = r.json()
print("Value:", data["value"])
```

### iOS (Swift)
```swift
import Foundation

let url = URL(string: "https://whirl-web.onrender.com/generate")!

var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let task = URLSession.shared.dataTask(with: request) { data, _, error in
    guard let data, error == nil else {
        print("Request failed:", error?.localizedDescription ?? "unknown error")
        return
    }

    do {
        if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
           let value = json["value"] {
            print("Value:", value)
        }
    } catch {
        print("JSON error:", error)
    }
}

task.resume()
RunLoop.main.run()
```

### Android (Kotlin)
```kotlin
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

fun main() {
    val client = OkHttpClient()

    val emptyBody =
        ByteArray(0).toRequestBody("application/json".toMediaType())

    val request = Request.Builder()
        .url("https://whirl-web.onrender.com/generate")
        .post(emptyBody)
        .addHeader("Content-Type", "application/json")
        .build()

    client.newCall(request).execute().use { response ->
        val body = response.body!!.string()
        val json = JSONObject(body)
        val value = json.get("value")

        println("Value: $value")
    }
}
```

### Go
```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	req, err := http.NewRequest(
		"POST",
		"https://whirl-web.onrender.com/generate",
		nil,
	)
	if err != nil {
		panic(err)
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	var result struct {
		Value float64 `json:"value"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		panic(err)
	}

	fmt.Println("Value:", result.Value)
}
```
