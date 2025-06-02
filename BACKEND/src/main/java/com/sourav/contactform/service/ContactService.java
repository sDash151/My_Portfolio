package com.sourav.contactform.service;

import org.springframework.stereotype.Service;
import com.sourav.contactform.model.Contact;
import com.sourav.contactform.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }
}
