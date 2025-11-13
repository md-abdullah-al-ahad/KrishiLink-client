const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Abdul Karim",
      location: "Rajshahi",
      image: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
      quote:
        "KrishiLink helped me connect directly with buyers for my wheat crop. I eliminated middlemen and increased my profits by 30%. This platform is a game-changer for small farmers like me!",
      crop: "Wheat Farmer",
    },
    {
      id: 2,
      name: "Fatema Begum",
      location: "Dhaka",
      image: "https://xsgames.co/randomusers/assets/avatars/female/12.jpg",
      quote:
        "I found quality organic vegetables through KrishiLink for my restaurant. The direct connection with farmers ensures freshness and supports local agriculture. Highly recommended!",
      crop: "Restaurant Owner",
    },
    {
      id: 3,
      name: "Mohammad Hossain",
      location: "Mymensingh",
      image: "https://xsgames.co/randomusers/assets/avatars/male/25.jpg",
      quote:
        "As a young farmer, KrishiLink gave me access to modern farming insights and a network of experienced farmers. I learned new techniques and sold my entire rice harvest within weeks!",
      crop: "Rice Farmer",
    },
  ];

  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Hear from farmers and buyers who transformed their agricultural
            business with KrishiLink.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-base-content/70">
                      {testimonial.crop}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-base-content/60">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <svg
                    className="w-8 h-8 text-primary/20 mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base-content/80 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-warning fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-base-content/60 mb-4">
            Join thousands of satisfied farmers and buyers
          </p>
          <a href="/register" className="btn btn-primary btn-lg gap-2">
            Start Your Success Story
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
