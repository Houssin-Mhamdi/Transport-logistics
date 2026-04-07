import { useTranslations } from 'next-intl';

export default function TestimonialSection() {
  const t = useTranslations('TestimonialSection');

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.sarah.name'),
      role: t('testimonials.sarah.role'),
      company: t('testimonials.sarah.company'),
      text: t('testimonials.sarah.text'),
      image: "/images/testimonials/sarah-jenkins.png",
      initials: "SJ",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      id: 2,
      name: t('testimonials.david.name'),
      role: t('testimonials.david.role'),
      company: t('testimonials.david.company'),
      text: t('testimonials.david.text'),
      image: "/images/testimonials/david-chen.png",
      initials: "DC",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600"
    },
    {
      id: 3,
      name: t('testimonials.maria.name'),
      role: t('testimonials.maria.role'),
      company: t('testimonials.maria.company'),
      text: t('testimonials.maria.text'),
      image: "/images/testimonials/maria-rodriguez.png",
      initials: "MR",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase text-sm">
            {t('header.badge')}
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t('header.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('header.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700 relative flex flex-col justify-between"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 text-gray-100 dark:text-gray-700/50">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              <div className="relative z-10">
                <p className="text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center mt-auto">
                <div className={`w-12 h-12 rounded-full ${testimonial.bgColor} ${testimonial.textColor} shrink-0 flex items-center justify-center font-bold text-lg overflow-hidden border-2 border-white/20 shadow-sm`}>
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    testimonial.initials
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}, <span className="font-medium text-gray-700 dark:text-gray-300">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
