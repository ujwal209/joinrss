import React from 'react';
import Image from 'next/image';
import { FaUsers, FaHeart, FaMicrophone, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaDove, FaHistory, FaPeace, FaMusic, FaHands } from 'react-icons/fa';

const BhajanSandhya = React.forwardRef<HTMLElement, { id: string }>(({ id }, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#f8f5f0] to-[#f9ebdf] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 right-5 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#FFD9CF] rounded-full opacity-50"></div>
      <div className="absolute bottom-10 left-5 sm:left-10 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-[#FFE5DE] rounded-full opacity-60"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-12 lg:mb-16">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4 md:mb-6">
            <Image
              src="/bhajan.png"
              alt="Bhajan Sandhya Icon"
              fill
              className="object-contain drop-shadow-lg"
              sizes="(max-width: 768px) 80px, 112px"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7c0f00] mb-3 md:mb-4">
            Bhajan Sandhya
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#7c0f00] to-[#E65911] mb-4 md:mb-6 rounded-full"></div>
        </div>
        {/* Info Cards */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 mb-12 md:mb-14 lg:mb-16">
          <div className="bg-white p-4 sm:p-5 rounded-xl md:rounded-2xl border border-[#E65911]/20 shadow-md md:shadow-lg flex flex-col items-center text-center w-full sm:max-w-[200px] md:max-w-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FFE5DE] flex items-center justify-center mb-3 sm:mb-4">
              <FaUsers className="text-xl sm:text-2xl text-[#7c0f00]" />
            </div>
            <h3 className="font-bold text-[#7c0f00] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Age Group</h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">All ages welcome</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl md:rounded-2xl border border-[#E65911]/20 shadow-md md:shadow-lg flex flex-col items-center text-center w-full sm:max-w-[200px] md:max-w-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FFE5DE] flex items-center justify-center mb-3 sm:mb-4">
              <FaHeart className="text-xl sm:text-2xl text-[#7c0f00]" />
            </div>
            <h3 className="font-bold text-[#7c0f00] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Benefits</h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">Spiritual Growth</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl md:rounded-2xl border border-[#E65911]/20 shadow-md md:shadow-lg flex flex-col items-center text-center w-full sm:max-w-[200px] md:max-w-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FFE5DE] flex items-center justify-center mb-3 sm:mb-4">
              <FaMicrophone className="text-xl sm:text-2xl text-[#7c0f00]" />
            </div>
            <h3 className="font-bold text-[#7c0f00] text-sm sm:text-base md:text-lg mb-1 sm:mb-2">Focus</h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base">Devotional Singing</p>
          </div>
        </div>

        {/* Importance Section */}
        <div className="mb-12 md:mb-14 lg:mb-16">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#7c0f00] mb-8 md:mb-10 text-center relative pb-3">
            <span className="relative z-10">Importance of Bhajan Sandhya</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-gradient-to-r from-[#7c0f00] to-[#E65911] rounded-full"></div>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[
              {
                title: "Calmness of Mind",
                desc: "Singing or listening to bhajans soothes the heart and brings inner peace",
                icon: <FaPeace className="text-2xl sm:text-3xl text-[#7c0f00] mb-2 sm:mb-3" />,
              },
              {
                title: "Positive Vibrations",
                desc: "Divine words and melodies create uplifting energy that purifies surroundings",
                icon: <FaStar className="text-2xl sm:text-3xl text-[#7c0f00] mb-2 sm:mb-3" />,
              },
              {
                title: "Emotional Balance",
                desc: "Channel emotions into devotion, reducing anxiety and nurturing joy",
                icon: <FaDove className="text-2xl sm:text-3xl text-[#7c0f00] mb-2 sm:mb-3" />,
              },
              {
                title: "Spiritual Connection",
                desc: "Deepens bond with the Divine, turning moments into spiritual experiences",
                icon: <FaHistory className="text-2xl sm:text-3xl text-[#7c0f00] mb-2 sm:mb-3" />,
              },
              {
                title: "Community Bonding",
                desc: "Strengthens unity, harmony, and shared devotion through collective singing",
                icon: <FaHands className="text-2xl sm:text-3xl text-[#7c0f00] mb-2 sm:mb-3" />,
              },
              {
                title: "Healthy Routine",
                desc: "Cultivates discipline, optimism, and a sense of togetherness",
                icon: <FaCalendarAlt className="text-2xl sm:text-3xl text-[#7c0f00] mb-2 sm:mb-3" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl border border-[#E65911]/20 shadow-sm md:shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-1"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#FFE5DE] flex items-center justify-center group-hover:bg-[#FFD9CF] transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-bold text-lg sm:text-xl text-[#7c0f00] mb-2 sm:mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#7c0f00] to-[#E65911] p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg text-white">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Join Us for Divine Melodies</h3>
          <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-5 lg:mb-6 max-w-2xl mx-auto opacity-90">
            Experience the peace and joy of collective devotional singing every Saturday evening
          </p>
          <a
            href="#hero"
            className="inline-block bg-white text-[#7c0f00] font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Attend Bhajan Sandhya
          </a>
        </div>
      </div>
    </section>
  );
});

BhajanSandhya.displayName = 'BhajanSandhya';

export default BhajanSandhya;