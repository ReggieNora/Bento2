import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Users, Heart, Target, Star, CheckCircle, Building2, TrendingUp } from 'lucide-react';
import GradientText from '../components/GradientText';
import StarBorder from '../components/StarBorder';
import { BentoGridItem } from '../components/ui/BentoGrid';
import Iridescence from '../components/Iridescence';
import LetterGlitch from '../components/LetterGlitch';

const AboutUsPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Matching",
      description: "Our AI-powered algorithm instantly connects the right talent with the right opportunities."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-Centered Design",
      description: "Every interaction is designed to feel natural, intuitive, and respectful of your time."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mutual Respect",
      description: "Both candidates and employers deserve transparency, clarity, and genuine connections."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Targeting",
      description: "No more spray-and-pray. Every match is intentional, relevant, and meaningful."
    }
  ];

  const testimonials = [
    {
      quote: "Hirly completely transformed our hiring process. We went from 6 weeks to 2 weeks average time-to-hire.",
      author: "Sarah Chen",
      role: "Head of Talent, TechFlow",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      quote: "As a developer, I loved how Hirly showed me only relevant opportunities. No more irrelevant spam.",
      author: "Marcus Rodriguez",
      role: "Senior Software Engineer",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      quote: "The swipe interface made candidate review actually enjoyable. Our team loves using Hirly.",
      author: "Emily Watson",
      role: "Recruiting Manager, InnovateCorp",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const caseStudies = [
    {
      company: "TechFlow",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      metric: "67% faster hiring",
      description: "Reduced time-to-hire from 6 weeks to 2 weeks"
    },
    {
      company: "InnovateCorp",
      logo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      metric: "3x more qualified candidates",
      description: "Improved candidate quality through AI matching"
    },
    {
      company: "StartupXYZ",
      logo: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=600",
      metric: "90% candidate satisfaction",
      description: "Candidates love the transparent process"
    }
  ];

  const values = [
    {
      title: "Transparency",
      description: "No hidden algorithms. No black boxes. You know exactly how and why matches are made."
    },
    {
      title: "Efficiency",
      description: "Time is precious. We eliminate the noise and focus on what matters: great matches."
    },
    {
      title: "Respect",
      description: "Every person deserves to be treated with dignity, whether they're hiring or job seeking."
    },
    {
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible in talent acquisition."
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Effects */}
      <Iridescence 
        color={[0.4, 0.2, 0.8]}
        speed={0.2}
        amplitude={0.05}
      />
      <LetterGlitch
        glitchColors={["#7c3aed", "#ec4899", "#2e1065"]}
        glitchSpeed={75}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center w-full px-12 py-6">
        <motion.button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>
        
        <div className="flex items-center gap-8">
          <a href="/#pricing" className="text-white/70 hover:text-white transition-colors">Pricing</a>
          <StarBorder
            as="button"
            color="rgb(147, 51, 234)"
            speed="5s"
            onClick={() => window.location.href = '/'}
          >
            Get Started
          </StarBorder>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText
            colors={["#6a11cb", "#2575fc", "#3a1859", "#6a11cb", "#1e215d"]}
            animationSpeed={8}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6"
          >
            About Hirly
          </GradientText>
          <motion.p
            className="text-2xl text-white/80 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We're revolutionizing how talent and opportunity find each other.
            <br />
            <span className="text-purple-300">Hiring, redefined.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <StarBorder
              as="button"
              color="rgb(147, 51, 234)"
              speed="5s"
              onClick={() => window.location.href = '/'}
            >
              Start Your Journey
            </StarBorder>
          </motion.div>
        </motion.div>
      </section>

      {/* What Hirly Is Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What is Hirly?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hirly is the first swipe-based hiring platform that makes talent discovery 
              as intuitive as finding your next favorite song. We've taken the complexity 
              out of hiring and job searching.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <BentoGridItem
                  title={feature.title}
                  description={<span className="text-sm text-white/70">{feature.description}</span>}
                  header={
                    <div className="flex items-center justify-center h-full">
                      <div className="text-purple-400">
                        {feature.icon}
                      </div>
                    </div>
                  }
                  icon={feature.icon}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              Why We're Different
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Swipe-Based Simplicity</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    No more endless scrolling through irrelevant listings. Our swipe interface 
                    lets you make quick, intuitive decisions. Swipe right for opportunities 
                    that excite you, left for those that don't.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">AI-Powered Precision</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Our intelligent matching algorithm learns from every interaction, 
                    continuously improving the quality of matches. The more you use Hirly, 
                    the better it gets at understanding what you're looking for.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Human-First Approach</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Behind every profile is a real person with real aspirations. We've designed 
                    every interaction to be respectful, transparent, and genuinely helpful for 
                    both candidates and employers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientText
              colors={["#6a11cb", "#2575fc", "#3a1859", "#6a11cb", "#1e215d"]}
              animationSpeed={8}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8"
            >
              Our Mission
            </GradientText>
            <p className="text-2xl text-white/80 mb-12 leading-relaxed">
              To create a world where finding the right job or the right candidate 
              is as simple as a swipe, and as meaningful as a handshake.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What People Say
            </h2>
            <p className="text-xl text-white/70">
              Real stories from real users who've transformed their hiring process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.author}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-white/70">
              See how Hirly has transformed hiring for companies of all sizes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-white/10 mx-auto mb-6 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{study.company}</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">{study.metric}</div>
                <p className="text-white/70">{study.description}</p>
                <button className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors">
                  Read Case Study
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <StarBorder
              as="button"
              color="rgb(147, 51, 234)"
              speed="5s"
              onClick={() => window.location.href = '/'}
            >
              Join These Success Stories
            </StarBorder>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientText
              colors={["#6a11cb", "#2575fc", "#3a1859", "#6a11cb", "#1e215d"]}
              animationSpeed={8}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
            >
              Ready to Transform Your Hiring?
            </GradientText>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of companies and candidates who've already discovered 
              the future of hiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <StarBorder
                as="button"
                color="rgb(147, 51, 234)"
                speed="5s"
                onClick={() => window.location.href = '/'}
              >
                Get Started Free
              </StarBorder>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-semibold transition-colors border border-white/20">
                Schedule a Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;