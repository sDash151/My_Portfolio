package com.sourav.contactform.controller;

import com.sourav.contactform.model.Contact;
import com.sourav.contactform.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<String> saveContact(@RequestBody Contact contact) {
        try {
            System.out.println("📥 Received contact: " + contact);

            // Save to database using service
            contactService.saveContact(contact);

            System.out.println("✅ Saved to database successfully");

            return ResponseEntity.ok("Message received! Thank you, " + contact.getName() + "!");
        } catch (Exception e) {
            System.err.println("❌ Error saving contact to database:");
            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body("Failed to save message. Please try again later.");
        }
    }
}
