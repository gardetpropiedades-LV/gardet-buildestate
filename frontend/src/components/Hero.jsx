import { useState } from "react";
import { Search, MapPin, ArrowRight, Star, Users, Home, Shield, Sparkles, TrendingUp, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroimage from "../assets/images/heroimage.png";
import { RadialGradient } from "react-text-gradients";

const popularLocations = [
  "Buenos Aires",
  "Ciudad de México",
  "Madrid",
  "Barcelona",
  "Santiago"
];

const quickFilters = [
  { label: "Departamentos", icon: Home, count: "2.5k+" },
  { label: "Casas", icon: Home, count: "1.8k+" },
  { label: "Villas", icon: Home, count: "750+" },
  { label: "Estudios", icon: Home, count: "1.2k+" }
];

const stats = [
  { icon: Users, value: "50K+", label: "Familias acompañadas", color: "from-brand-500 to-brand-700" },
  { icon: Home, value: "2.500+", label: "Propiedades activas", color: "from-brand-400 to-brand-600" },
  { icon: Star, value: "4.9", label: "Calificación promedio", color: "from-amber-400 to-brand-500" },
  { icon: Shield, value: "100%", label: "Operaciones verificadas", color: "from-emerald-400 to-brand-600" }
];

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const sparkleAnimation = {
  scale: [1, 1.2, 1],
  rotate: [0, 180, 360],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyType, setPropertyType] = useState("All");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSubmit = (location = searchQuery) => {
    if (location.trim()) {
      navigate(`/properties?location=${encodeURIComponent(location)}&type=${propertyType}`);
    }
  };

  const handleLocationClick = (location) => {
    setSearchQuery(location);
    setShowSuggestions(false);
    handleSubmit(location);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-amber-50/40 to-stone-50"></div>

        {/* Hero image with overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/15 via-transparent to-brand-600/10" />
        </motion.div>

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-brand-200/25 to-brand-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-brand-300/20 via-brand-200/15 to-brand-500/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-brand-200/20 to-emerald-300/10 rounded-full blur-3xl"
          />
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={sparkleAnimation}
              transition={{ delay: i * 0.5 }}
              className={`absolute w-6 h-6 text-brand-400/60 ${
                i % 2 === 0 ? 'top-1/4' : 'top-3/4'
              } ${
                i % 3 === 0 ? 'left-1/4' : i % 3 === 1 ? 'left-1/2' : 'left-3/4'
              }`}
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top spacing */}
        <div className="pt-24 lg:pt-32"></div>
        
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Trust Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/90 px-6 py-3 text-sm font-semibold text-brand-800 shadow-lg backdrop-blur-md mb-8"
              >
                <Shield className="w-4 h-4 text-brand-600" />
                <span>Con la confianza de más de 50.000 familias</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-brand-400 text-brand-400" />
                  ))}
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className="mb-6 text-5xl font-bold leading-[0.9] sm:text-6xl md:text-7xl">
                  <RadialGradient
                    gradient={["circle, rgba(199,160,70,1) 0%, rgba(149,117,50,1) 100%"]}
                  >
                    Descubrí
                  </RadialGradient>
                  <br />
                  <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                    tu hogar ideal
                  </span>
                </h1>

                <motion.p
                  variants={itemVariants}
                  className="mx-auto mb-12 max-w-3xl text-xl font-medium leading-relaxed text-gray-700 sm:text-2xl"
                >
                  Conectamos familias con propiedades excepcionales en ubicaciones premium gracias a nuestra
                  <span className="font-semibold text-brand-600"> búsqueda asistida por IA</span> y el
                  <span className="font-semibold text-brand-700"> acompañamiento de especialistas Gardet</span>.
                </motion.p>
              </motion.div>

              {/* Enhanced Search Section */}
              <motion.div
                variants={itemVariants}
                className="relative max-w-4xl mx-auto mb-16"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/50">
                  {/* Property Type Filters */}
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {quickFilters.map((filter) => (
                      <motion.button
                        key={filter.label}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPropertyType(filter.label)}
                        className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                          propertyType === filter.label
                            ? 'bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg'
                            : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                        }`}
                      >
                        <filter.icon className="w-4 h-4" />
                        <span>{filter.label}</span>
                        <span className="text-xs opacity-75">({filter.count})</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transform transition-colors duration-300 ${
                        isSearchFocused ? 'text-brand-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                          setShowSuggestions(true);
                          setIsSearchFocused(true);
                        }}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Ingresá ciudad, barrio o referencia..."
                        className="w-full rounded-2xl border-2 border-gray-200 bg-white/90 pl-12 pr-6
                          text-lg font-medium placeholder-gray-500 transition-all duration-300
                          focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20"
                      />
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 rounded-2xl bg-brand-50 px-6 py-4 font-medium text-brand-800 transition-all hover:bg-brand-100"
                      >
                        <Filter className="w-5 h-5" />
                        <span className="hidden sm:inline">Filtros</span>
                      </motion.button>

                      <motion.button
                        onClick={() => handleSubmit()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:shadow-2xl"
                      >
                        <Search className="w-5 h-5" />
                        <span>Buscar propiedades</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Enhanced Location Suggestions */}
                  <AnimatePresence>
                    {showSuggestions && searchQuery.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-6 right-6 top-full mt-4 bg-white/98 backdrop-blur-md 
                          rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                              <TrendingUp className="h-5 w-5 text-brand-500" />
                              Zonas destacadas
                            </h3>
                            <span className="text-sm text-gray-500">Elegí entre los barrios más buscados</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {popularLocations.map((location, index) => (
                              <motion.button
                                key={location}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleLocationClick(location)}
                                className="group flex items-center justify-between rounded-xl border border-transparent p-4 text-left transition-all duration-300 hover:border-brand-200 hover:bg-brand-50 hover:shadow-md"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700">
                                    <MapPin className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-900 transition-colors group-hover:text-brand-700">{location}</span>
                                    <div className="text-xs text-gray-500">
                                      {Math.floor(Math.random() * 500) + 100}+ propiedades
                                    </div>
                                  </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-600" />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl 
                      border border-white/50 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${stat.color} 
                      rounded-2xl flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="pb-16"></div>
      </div>
    </div>
  );
};

export default Hero;