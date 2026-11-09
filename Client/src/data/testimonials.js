export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image?: string;   // path to a photo in /public/testimonials/
  rating?: number;  // 1-5, only if the person actually gave one
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Khuliso John Thavhiwa is an exceptional Analyst and Developer and a fantastic person (Good Humor) to work with. During our time together at Umuzi's Design Thinking Sprint, I was consistently impressed by their ability to his strategic approach. He is highly skilled and always willing to collaborate and help others. Any team/organisation has gained a true team player who consistently delivers high-quality work.",
    name: "Naledi Motsoikha",
    role: "Data Analyst | Developer, Umuzi Design Thinking Sprint teammate",
    image: "/testimonials/naledi.jpg",
    rating: undefined, // TODO: only add if Naledi gives a rating
  },
  {
    quote:
      "I had the privilege of being a mathematics student of Khuliso John Thavhiwa, and I can confidently say that he is a dedicated tutor, mentor, and someone who genuinely cares about the growth and success of others. As my mathematics tutor, he demonstrated patience, strong communication skills, and an ability to explain complex concepts in a simple and understandable way. He encouraged me to think critically, approach challenges with confidence, and develop a stronger problem-solving mindset. Beyond mathematics, Khuliso played an important role in introducing me to the world of technology and helping me explore opportunities in the tech industry. His guidance and encouragement inspired me to pursue my interests in this field, and I am now pursuing my career at the University of the Witwatersrand (Wits). What stands out about Khuliso is his willingness to share knowledge, guide others, and help people recognise their potential. He is more than a tutor; he is a mentor who makes a meaningful difference in the lives of the people he teaches. I highly recommend Khuliso for opportunities in education, mentorship, and technology. His dedication to continuous learning, problem-solving, and helping others succeed makes him a valuable asset to any team or organisation.",
    name: "Blessing Mubvafhi",
    role: "BSc Computer Science Student, Wits (former maths student)",
    image: "/testimonials/blessing.jpg",
    rating: undefined, // TODO
  },
  {
    quote:
      "I had the pleasure of working with Khuliso John Thavhiwa on the development of the VAD Enterprise website. Throughout the project, he demonstrated strong technical skills, professionalism, and a clear commitment to delivering a solution that aligned with our business needs. Khuliso took the time to understand our requirements and translate them into a functional website that supports our online presence. His technical knowledge, problem-solving abilities, and dedication to his work made him a valuable partner throughout the development process. What stood out was his willingness to engage with our needs, work towards practical solutions, and apply his software development expertise to bring our vision to life. I would recommend Khuliso to businesses and organisations looking for a dedicated software developer who takes his work seriously and is committed to delivering value to clients. I look forward to seeing his continued growth and success in the technology industry.",
    name: "CLIENT NAME", // TODO
    role: "Client, VAD Enterprise website",
    image: "/testimonials/client.jpg",
    rating: undefined, // TODO
  },
];