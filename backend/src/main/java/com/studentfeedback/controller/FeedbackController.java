package com.studentfeedback.controller;

import com.studentfeedback.entity.Feedback;
import com.studentfeedback.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<Feedback> submit(@Valid @RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.submit(feedback));
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> all() {
        return ResponseEntity.ok(feedbackService.findAll());
    }
}






