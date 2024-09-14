package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

@RestController
public class BrowserController {

    @GetMapping("/fetch")
    public String fetchUrl(@RequestParam String url) {
        try {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                return "Invalid URL: must start with http:// or https://";
            }

            Document doc = Jsoup.connect(url).get();
            return doc.html();
        } catch (Exception e) {
            return "Error fetching the URL: " + e.getMessage();
        }
    }
}