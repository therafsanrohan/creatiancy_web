export type Testimonial = {
  id: string;
  name: string;
  designation: string;
  image: string;
  review: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Hector Oviedo",
    designation: "Founder of OMNI CONNECTS",
    image: "/clients/hector_img.jpg",
    review: "Amazing company to work with. They treat you like family with respect and kindness and customer service is A+. A company driven to meet your standards."
  },
  {
    id: "2",
    name: "Awais Sadiq",
    designation: "Founder",
    image: "/clients/Awais_img.webp",
    review: "The communication was awesome, and they are really good at what they do. They made sure to deliver the best and worked really hard with me to achieve the desired results. I totally recommend them to others and will definitely bring them more work. Thank you!"
  }
];
