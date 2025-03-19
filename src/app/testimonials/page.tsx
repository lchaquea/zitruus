'use client';

import React from 'react';
import TestimonialBubble from '../components/TestimonialBubble';

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          What Our <span className="text-brand-lime">Clients</span> Say
        </h1>
        
        <div className="relative h-[600px] w-full bg-black/50 rounded-2xl border border-gray-800 p-8 mb-16">
          {/* Testimonial Bubbles */}
          <div className="relative w-full h-full">
            <TestimonialBubble 
              imageSrc="/images/testimonials/carlos.svg" 
              name="Carlos R."
              role="Product Manager"
              testimonial="The cultural fit was perfect from day one. Zitruus matched me with a company that truly values my expertise and perspective."
              position={{ top: '10%', left: '20%' }}
            />
            
            <TestimonialBubble 
              imageSrc="/images/testimonials/sarah.svg" 
              name="Sarah L."
              role="Senior Developer"
              testimonial="I was skeptical at first, but Zitruus found me a role that perfectly matched my skills and career goals. The process was smooth and professional."
              position={{ top: '30%', right: '15%' }}
            />
            
            <TestimonialBubble 
              imageSrc="/images/testimonials/michael.svg" 
              name="Michael T."
              role="UX Designer"
              testimonial="After months of searching on my own, Zitruus connected me with my dream job in just two weeks. Their team really understands the tech industry."
              position={{ bottom: '20%', left: '30%' }}
            />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who found their perfect match with Zitruus. 
            Our personalized approach ensures we understand your unique skills and career goals.
          </p>
          
          <button className="px-8 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
            Get Started Today
          </button>
        </div>
      </div>
    </main>
  );
} 