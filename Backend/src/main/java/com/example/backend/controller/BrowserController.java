package com.example.backend.controller;

import com.example.backend.model.UrlRequest;
import com.example.backend.model.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BrowserController {
    private final List<String> urls = new ArrayList<>();
    private final List<User> users = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String filePath = "src/main/resources/urls.json";

    public BrowserController() {
        loadUrlsFromFile();
        users.add(new User("user1", true));
        users.add(new User("user2", false));
        users.add(new User("user3", true));
    }

    private void loadUrlsFromFile() {
        try {
            File file = new File(filePath);
            if (file.exists()) {
                List<String> loadedUrls = objectMapper.readValue(file, new TypeReference<List<String>>() {});
                urls.addAll(loadedUrls);
            }
        } catch (IOException e) {
            System.err.println("Error loading URLs from file: " + e.getMessage());
        }
    }

    private void saveUrlsToFile() {
        try {
            objectMapper.writeValue(new File(filePath), urls);
            System.out.println("URLs saved to file successfully.");
        } catch (IOException e) {
            System.err.println("Error saving URLs to file: " + e.getMessage());
        }
    }

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

    @PostMapping("/api/urls")
    public ResponseEntity<String> addUrl(@RequestBody UrlRequest urlRequest) {
        System.out.println("Add URL: " + urlRequest.getUrl());
        if (urlRequest.getUrl() == null || urlRequest.getUrl().isEmpty()) {
            return ResponseEntity.badRequest().body("error URL");
        }

        if (!urls.contains(urlRequest.getUrl())) {
            urls.add(urlRequest.getUrl());
            saveUrlsToFile();
            return ResponseEntity.ok("URL added successfully");
        } else {
            return ResponseEntity.status(409).body("URL already exists");
        }
    }

    @PostMapping("/urls/delete")
    public ResponseEntity<String> deleteUrl(@RequestBody UrlRequest urlRequest) {
        if (urlRequest.getUrl() == null || urlRequest.getUrl().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: URL cannot be empty.");
        }

        urls.remove(urlRequest.getUrl());
        return ResponseEntity.ok("URL deleted successfully.");
    }

    @GetMapping("/users/active")
    public List<User> getActiveUsers() {
        List<User> activeUsers = new ArrayList<>();
        for (User user : users) {
            if (user.isActive()) {
                activeUsers.add(user);
            }
        }
        return activeUsers;
    }

    @GetMapping("/api/urls")
    public List<String> getUrls() {
        System.out.println("List URL: " + urls);
        return urls;
    }
}