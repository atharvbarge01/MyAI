const Testimonials= () => {
    const testimonials = [
        { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
        { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" },
        { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." },
        { id: 4, 
        name: "Aarav Sharma", 
        address: "Mumbai, India", 
        image: "https://images.unsplash.com/photo-1603415526960-f7e0328fadc0?q=80&w=200", 
        rating: 3.5, 
        review: "Your AI website is amazing! The resume analysis feature gave me precise suggestions to improve my profile for job applications. It felt like having a personal career coach." 
    },
    { 
        id: 5, 
        name: "Priya Nair", 
        address: "Bangalore, India", 
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200", 
        rating: 4, 
        review: "I loved using the background remover—it was super fast and accurate. Creating blogs and subject articles was effortless with your AI tools. Great platform for students and professionals alike." 
    },
    { 
        id: 6, 
        name: "Rohan Gupta", 
        address: "Delhi, India", 
        image: "https://images.unsplash.com/photo-1604881991766-3a8a3b57a0e1?q=80&w=200", 
        rating: 5, 
        review: "The AI-powered blog and article creation tool saved me hours of work. I even generated high-quality study material within minutes. Definitely a must-use website for productivity!" 
    }
    ];

    const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-primary" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );

    return (
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-12 pb-8">
            <div className="flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl md:text-[40px] font-bold">Customer Reviews</h1>
                <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-[696px]">Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <Star key={index} filled={testimonial.rating > index} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Testimonials