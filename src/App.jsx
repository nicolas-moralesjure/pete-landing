import './App.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Phone, Mail, MapPin, Wrench, Zap, Sparkles, Hammer, Star, CheckCircle, Clock, Shield, Award } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './components/ui/dialog'

// Importar imágenes
import fontaneriaImg from './assets/fontaneria.jpg'
import electricidadImg from './assets/electricidad.jpg'
import limpiezaImg from './assets/limpieza.jpg'
import handymanImg from './assets/imagen_handyman.jpg'
import peteLogo from './assets/pete-logo.jpg'

const initialSignupState = {
  nombre: '',
  dni: '',
  telefono: '',
  email: '',
  ciudad: '',
  password: '',
}

const workerPool = [
  {
    id: 'worker-1',
    nombre: 'Luis Pérez',
    servicio: 'Fontanería',
    lat: 40.4168,
    lng: -3.7038,
    rating: 4.9,
    trabajosCompletados: 128,
  },
  {
    id: 'worker-2',
    nombre: 'María Fernández',
    servicio: 'Electricidad',
    lat: 41.3874,
    lng: 2.1686,
    rating: 4.8,
    trabajosCompletados: 142,
  },
  {
    id: 'worker-3',
    nombre: 'Ana López',
    servicio: 'Limpieza',
    lat: 39.4699,
    lng: -0.3763,
    rating: 4.7,
    trabajosCompletados: 196,
  },
  {
    id: 'worker-4',
    nombre: 'Carlos García',
    servicio: 'Handyman',
    lat: 37.3891,
    lng: -5.9845,
    rating: 4.9,
    trabajosCompletados: 173,
  },
  {
    id: 'worker-5',
    nombre: 'Laura Martínez',
    servicio: 'Limpieza',
    lat: 36.7213,
    lng: -4.4214,
    rating: 4.8,
    trabajosCompletados: 154,
  },
  {
    id: 'worker-6',
    nombre: 'Javier Ruiz',
    servicio: 'Electricidad',
    lat: 39.8628,
    lng: -4.0273,
    rating: 4.7,
    trabajosCompletados: 88,
  },
  {
    id: 'worker-7',
    nombre: 'Sofía Gómez',
    servicio: 'Fontanería',
    lat: 43.2630,
    lng: -2.9350,
    rating: 4.9,
    trabajosCompletados: 134,
  },
  {
    id: 'worker-8',
    nombre: 'Diego Navarro',
    servicio: 'Handyman',
    lat: 28.1235,
    lng: -15.4363,
    rating: 4.6,
    trabajosCompletados: 92,
  },
]

function toRadians(value) {
  return (value * Math.PI) / 180
}

function calculateDistanceKm(coordA, coordB) {
  const earthRadiusKm = 6371
  const dLat = toRadians(coordB.lat - coordA.lat)
  const dLon = toRadians(coordB.lng - coordA.lng)
  const lat1 = toRadians(coordA.lat)
  const lat2 = toRadians(coordB.lat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusKm * c
}

const serviceBackgrounds = {
  Fontanería: 'linear-gradient(135deg, rgba(241, 245, 249, 0.95), rgba(224, 231, 255, 0.95))',
  Electricidad: 'linear-gradient(135deg, rgba(241, 245, 249, 0.95), rgba(224, 231, 255, 0.95))',
  Limpieza: 'linear-gradient(135deg, rgba(241, 245, 249, 0.95), rgba(224, 231, 255, 0.95))',
  Handyman: 'linear-gradient(135deg, rgba(241, 245, 249, 0.95), rgba(224, 231, 255, 0.95))',
}

function App() {
  const servicios = [
    {
      icon: <Wrench className="w-12 h-12 text-primary" />,
      titulo: "Fontanería",
      descripcion: "Reparaciones, instalaciones y mantenimiento de tuberías, grifos y sistemas de agua.",
      imagen: fontaneriaImg,
      tarifaBase: 45,
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      titulo: "Electricidad",
      descripcion: "Instalaciones eléctricas, reparaciones y mantenimiento con total seguridad.",
      imagen: electricidadImg,
      tarifaBase: 55,
    },
    {
      icon: <Sparkles className="w-12 h-12 text-primary" />,
      titulo: "Limpieza",
      descripcion: "Servicios de limpieza profesional para hogares y oficinas.",
      imagen: limpiezaImg,
      tarifaBase: 35,
    },
    {
      icon: <Hammer className="w-12 h-12 text-primary" />,
      titulo: "Handyman",
      descripcion: "Reparaciones generales, montaje de muebles y pequeñas reformas.",
      imagen: handymanImg,
      tarifaBase: 40,
    }
  ]

  const ventajas = [
    {
      icon: <CheckCircle className="w-8 h-8 text-accent" />,
      titulo: "Profesionales Certificados",
      descripcion: "Todos nuestros técnicos están certificados y tienen años de experiencia."
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      titulo: "Disponibilidad 24/7",
      descripcion: "Estamos disponibles cuando nos necesites, incluso en emergencias."
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      titulo: "Garantía de Satisfacción",
      descripcion: "Garantizamos la calidad de nuestro trabajo al 100%."
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      titulo: "Presupuestos Sin Compromiso",
      descripcion: "Te ofrecemos presupuestos gratuitos y transparentes."
    }
  ]

  const testimonios = [
    {
      nombre: "María González",
      ciudad: "Madrid",
      comentario: "Excelente servicio de fontanería. Llegaron rápido y solucionaron el problema perfectamente.",
      estrellas: 5
    },
    {
      nombre: "Carlos Ruiz",
      ciudad: "Barcelona",
      comentario: "Pete arregló mi instalación eléctrica de forma profesional y segura. Muy recomendable.",
      estrellas: 5
    },
    {
      nombre: "Ana Martín",
      ciudad: "Valencia",
      comentario: "El servicio de limpieza fue impecable. Dejaron mi casa como nueva.",
      estrellas: 5
    }
  ]

  const ciudades = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", 
    "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba"
  ]

  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(0)
  const [selectedService, setSelectedService] = useState(null)
  const [serviceNotes, setServiceNotes] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [nearestWorker, setNearestWorker] = useState(null)
  const [geoStatus, setGeoStatus] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [bookingSummary, setBookingSummary] = useState(null)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [signupData, setSignupData] = useState(() => ({ ...initialSignupState }))
  const [signupFeedback, setSignupFeedback] = useState('')
  const [loginMethod, setLoginMethod] = useState('email')
  const [loginData, setLoginData] = useState({ identifier: '', password: '' })
  const [loginFeedback, setLoginFeedback] = useState('')

  const bookingSteps = useMemo(
    () => [
      'Selecciona el servicio',
      'Describe tu necesidad',
      'Revisa la tarifa base',
      'Agenda tu servicio',
      'Confirmación',
    ],
    [],
  )

  const resetBooking = useCallback(() => {
    setBookingStep(0)
    setSelectedService(null)
    setServiceNotes('')
    setUserLocation(null)
    setNearestWorker(null)
    setGeoStatus('')
    setScheduledDate('')
    setScheduledTime('')
    setBookingSummary(null)
  }, [])

  const resetSignup = useCallback(() => {
    setSignupData({ ...initialSignupState })
    setSignupFeedback('')
  }, [])

  const resetLogin = useCallback(() => {
    setLoginMethod('email')
    setLoginData({ identifier: '', password: '' })
    setLoginFeedback('')
  }, [])

  const locateNearestWorker = useCallback((coords, service) => {
    if (!service) return null

    const available = workerPool.filter(worker => worker.servicio === service.titulo)
    if (!available.length) return null

    let candidate = null
    let shortestDistance = Number.POSITIVE_INFINITY

    available.forEach(worker => {
      const distance = calculateDistanceKm(coords, { lat: worker.lat, lng: worker.lng })
      if (distance < shortestDistance) {
        shortestDistance = distance
        candidate = { ...worker }
      }
    })

    if (!candidate) return null

    const distanceCost = Math.max(0, shortestDistance - 5) * 2
    const tarifaEstimada = Math.round(service.tarifaBase + distanceCost)

    return {
      ...candidate,
      distance: shortestDistance,
      tarifaEstimada,
    }
  }, [])

  const startGeolocation = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!selectedService) return

    if (!('geolocation' in navigator)) {
      setGeoStatus('Tu navegador no permite geolocalización automática. Indícanos tu ubicación manualmente.')
      return
    }

    setGeoStatus('Buscando tu ubicación en tiempo real...')

    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(coords)
        const worker = locateNearestWorker(coords, selectedService)
        setNearestWorker(worker)
        if (worker) {
          const distanceKm = worker.distance > 99 ? Math.round(worker.distance) : worker.distance.toFixed(1)
          setGeoStatus(`Listo, encontramos a ${worker.nombre} a ${distanceKm} km de tu ubicación.`)
        } else {
          setGeoStatus('Por ahora no encontramos técnicos cerca, pero te asignaremos el más próximo disponible.')
        }
      },
      error => {
        const message = error?.message ?? 'No pudimos obtener tu ubicación.'
        setGeoStatus(`No pudimos geolocalizarte automáticamente: ${message}`)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }, [locateNearestWorker, selectedService])

  useEffect(() => {
    if (bookingStep === 2 && selectedService) {
      if (userLocation) {
        const worker = locateNearestWorker(userLocation, selectedService)
        setNearestWorker(worker)
        if (worker) {
          const distanceKm = worker.distance > 99 ? Math.round(worker.distance) : worker.distance.toFixed(1)
          setGeoStatus(`Listo, encontramos a ${worker.nombre} a ${distanceKm} km de tu ubicación.`)
        }
      } else {
        startGeolocation()
      }
    }
  }, [bookingStep, locateNearestWorker, selectedService, startGeolocation, userLocation])

  const handleServiceSelection = service => {
    setSelectedService(service)
    setBookingStep(1)
  }

  const goToPreviousStep = () => {
    setBookingStep(step => Math.max(0, step - 1))
  }

  const goToNextStep = () => {
    setBookingStep(step => Math.min(step + 1, bookingSteps.length - 1))
  }

  const handleScheduleConfirm = () => {
    if (!selectedService || !scheduledDate || !scheduledTime) return

    setBookingSummary({
      servicio: selectedService.titulo,
      descripcion: serviceNotes,
      fecha: scheduledDate,
      hora: scheduledTime,
      profesional: nearestWorker,
      tarifa: nearestWorker?.tarifaEstimada ?? selectedService.tarifaBase,
    })
    goToNextStep()
  }

  const handleOpenChange = open => {
    setIsBookingOpen(open)
    if (!open) {
      resetBooking()
    }
  }

  const openBookingFlow = () => {
    resetBooking()
    setIsBookingOpen(true)
  }

  const openSignupDialog = () => {
    resetSignup()
    setIsSignupOpen(true)
  }

  const openLoginDialog = () => {
    resetLogin()
    setIsLoginOpen(true)
  }

  const handleSignupChange = (field, value) => {
    setSignupData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSignupSubmit = event => {
    event.preventDefault()
    const isIncomplete = Object.values(signupData).some(value => !`${value}`.trim())
    if (isIncomplete) {
      setSignupFeedback('Por favor completa todos los campos para crear tu cuenta.')
      return
    }
    setSignupData({ ...initialSignupState })
    setSignupFeedback('¡Cuenta creada con éxito! Revisa tu email para activar tu perfil.')
  }

  const handleSignupOpenChange = open => {
    setIsSignupOpen(open)
    if (!open) {
      resetSignup()
    }
  }

  const handleLoginMethodChange = method => {
    setLoginMethod(method)
    setLoginData(prev => ({ ...prev, identifier: '' }))
    setLoginFeedback('')
  }

  const handleLoginSubmit = event => {
    event.preventDefault()
    if (!loginData.identifier.trim() || !loginData.password.trim()) {
      setLoginFeedback('Introduce tus datos para iniciar sesión.')
      return
    }
    setLoginFeedback('Inicio de sesión exitoso. Te redireccionaremos a tu panel en breve.')
  }

  const handleLoginOpenChange = open => {
    setIsLoginOpen(open)
    if (!open) {
      resetLogin()
    }
  }

  const renderStepContent = () => {
    switch (bookingStep) {
      case 0:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Elige el tipo de servicio que necesitas.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {servicios.map(servicio => (
                <Card
                  key={servicio.titulo}
                  className="relative overflow-hidden border border-border/20 transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: serviceBackgrounds[servicio.titulo] ?? 'linear-gradient(135deg, rgba(241, 245, 249, 0.95), rgba(224, 231, 255, 0.95))' }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-25"
                    style={{ background: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.15), transparent 60%)' }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{ background: 'radial-gradient(circle at bottom left, rgba(249, 115, 22, 0.12), transparent 65%)' }}
                  />
                  <CardContent className="relative space-y-4 p-5">
                    <div className="space-y-2">
                      <h5 className="text-lg font-semibold text-foreground">{servicio.titulo}</h5>
                      <p className="text-sm text-muted-foreground">{servicio.descripcion}</p>
                      <p className="text-sm font-medium text-primary">Desde €{servicio.tarifaBase}</p>
                    </div>
                    <Button type="button" className="w-full" onClick={() => handleServiceSelection(servicio)}>
                      Elegir {servicio.titulo}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-foreground">Cuéntanos qué necesitas</h4>
              <p className="text-sm text-muted-foreground">
                Describe brevemente el problema o la tarea. Compartiremos esta información con el profesional para que llegue preparado.
              </p>
            </div>
            <Textarea
              value={serviceNotes}
              onChange={event => setServiceNotes(event.target.value)}
              rows={5}
              placeholder="Ejemplo: Tengo una fuga en el baño principal desde ayer. Se necesita revisar tuberías y sellados."
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={goToPreviousStep}>
                Volver
              </Button>
              <Button
                type="button"
                onClick={goToNextStep}
                disabled={!serviceNotes.trim()}
              >
                Continuar
              </Button>
            </DialogFooter>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4 text-sm text-foreground">
              <p className="font-semibold">
                Tarifa base estimada: €{selectedService?.tarifaBase}
              </p>
              <p className="mt-1 text-muted-foreground">
                Calculamos la tarifa según la distancia y el tipo de servicio. Si el traslado supera los 5 km añadimos un ajuste por logística.
              </p>
            </div>
            <div className="space-y-3 rounded-lg border border-border/60 bg-muted/30 p-4">
              <h4 className="font-semibold text-foreground">Localizando al profesional más cercano…</h4>
              <p className="text-sm text-muted-foreground">{geoStatus || 'Estamos analizando la disponibilidad cercana.'}</p>
              {nearestWorker ? (
                <Card className="border border-primary/30 bg-background">
                  <CardContent className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-semibold text-foreground">{nearestWorker.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          {nearestWorker.servicio} · {nearestWorker.trabajosCompletados} servicios completados
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        ★ {nearestWorker.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span>
                        Distancia estimada: {nearestWorker.distance > 99 ? Math.round(nearestWorker.distance) : nearestWorker.distance.toFixed(1)} km
                      </span>
                      <span>Tarifa estimada final: €{nearestWorker.tarifaEstimada}</span>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={goToPreviousStep}>
                Volver
              </Button>
              <Button type="button" onClick={goToNextStep}>
                Agendar servicio
              </Button>
            </DialogFooter>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="service-date">
                  Día del servicio
                </label>
                <Input
                  id="service-date"
                  type="date"
                  value={scheduledDate}
                  onChange={event => setScheduledDate(event.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="service-time">
                  Hora preferida
                </label>
                <Input
                  id="service-time"
                  type="time"
                  value={scheduledTime}
                  onChange={event => setScheduledTime(event.target.value)}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Compartiremos tu solicitud con {nearestWorker?.nombre ?? 'nuestro profesional disponible'}. Recibirás confirmación y seguimiento, con la ubicación en vivo del técnico asignado que te llegará por email.
            </p>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={goToPreviousStep}>
                Volver
              </Button>
              <Button
                type="button"
                onClick={handleScheduleConfirm}
                disabled={!scheduledDate || !scheduledTime}
              >
                Confirmar servicio
              </Button>
            </DialogFooter>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-primary/40 bg-primary/10 p-5">
              <h4 className="text-lg font-semibold text-foreground">¡Servicio agendado!</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Te enviaremos una notificación con el seguimiento en tiempo real cuando el profesional esté en camino.
              </p>
            </div>
            <div className="space-y-3 rounded-lg border border-border/60 bg-background p-5">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Servicio</span>
                <span className="text-base font-semibold text-foreground">{bookingSummary?.servicio}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Descripción</span>
                <span className="text-sm text-foreground">{bookingSummary?.descripcion}</span>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-foreground">
                <span>Fecha: {bookingSummary?.fecha}</span>
                <span>Hora: {bookingSummary?.hora}</span>
                <span>Tarifa estimada: €{bookingSummary?.tarifa}</span>
              </div>
              {bookingSummary?.profesional ? (
                <div className="rounded-md bg-muted/40 p-4">
                  <p className="text-sm font-semibold text-foreground">Profesional asignado</p>
                  <p className="text-sm text-muted-foreground">
                    {bookingSummary.profesional.nombre} · {bookingSummary.profesional.servicio} · ★{' '}
                    {bookingSummary.profesional.rating.toFixed(1)}
                  </p>
                </div>
              ) : null}
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => { resetBooking(); setIsBookingOpen(false) }}>
                Cerrar
              </Button>
              <Button type="button" onClick={() => { resetBooking(); setBookingStep(0) }}>
                Solicitar otro servicio
              </Button>
            </DialogFooter>
          </div>
        )
      default:
        return null
    }
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={peteLogo} alt="Pete Logo" className="w-10 h-10 rounded-lg" />
            <h1 className="text-2xl font-bold text-primary">Pete</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#servicios" className="text-foreground hover:text-primary transition-colors">Servicios</a>
            <a href="#nosotros" className="text-foreground hover:text-primary transition-colors">Nosotros</a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
          </nav>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 text-primary">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">900 123 456</span>
            </div>
            <Button
              variant="ghost"
              type="button"
              onClick={openSignupDialog}
            >
              Crea Tu Cuenta
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={openLoginDialog}
            >
              Iniciar Sesión
            </Button>
            <Button
              className="bg-accent hover:bg-accent/90"
              type="button"
              onClick={openBookingFlow}
            >
              Solicitar Servicio
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Pete - Tu Experto en <br />
            <span className="text-primary">Servicios del Hogar</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fontanería, Electricidad, Limpieza y Handyman en toda España. 
            Profesionales certificados disponibles 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-4"
              onClick={openBookingFlow}
              type="button"
            >
              Solicitar Servicio Ahora
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <Phone className="w-5 h-5 mr-2" />
              Llamar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Nuestros Servicios</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos una amplia gama de servicios para el hogar con la máxima calidad y profesionalismo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicios.map((servicio, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={servicio.imagen} 
                      alt={servicio.titulo}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {servicio.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">{servicio.titulo}</h4>
                  <p className="text-muted-foreground">{servicio.descripcion}</p>
                  <p className="mt-4 font-semibold text-primary">Tarifa base desde €{servicio.tarifaBase}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegir Pete */}
      <section id="nosotros" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">¿Por Qué Elegir Pete?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Somos tu mejor opción para servicios del hogar en España.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ventajas.map((ventaja, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {ventaja.icon}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{ventaja.titulo}</h4>
                <p className="text-muted-foreground">{ventaja.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Lo Que Dicen Nuestros Clientes</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonios.map((testimonio, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonio.estrellas)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonio.comentario}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonio.nombre}</p>
                    <p className="text-sm text-muted-foreground">{testimonio.ciudad}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zona de cobertura */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Zona de Cobertura</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prestamos nuestros servicios en las principales ciudades de España.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {ciudades.map((ciudad, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground">{ciudad}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Contacta con Nosotros</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Crea tu cuenta para gestionar solicitudes, guardar direcciones y recibir seguimiento en vivo de tus servicios.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h4 className="text-2xl font-semibold text-foreground mb-6">Información de Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Teléfono</p>
                    <p className="text-muted-foreground">900 123 456</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">info@pete-servicios.es</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Cobertura</p>
                    <p className="text-muted-foreground">Toda España</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-foreground mb-6">Crea Tu Cuenta</h4>
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nombre completo"
                    value={signupData.nombre}
                    onChange={event => handleSignupChange('nombre', event.target.value)}
                    autoComplete="name"
                  />
                  <Input
                    placeholder="DNI"
                    value={signupData.dni}
                    onChange={event => handleSignupChange('dni', event.target.value)}
                  />
                  <Input
                    placeholder="Teléfono"
                    type="tel"
                    value={signupData.telefono}
                    onChange={event => handleSignupChange('telefono', event.target.value)}
                    autoComplete="tel"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={signupData.email}
                    onChange={event => handleSignupChange('email', event.target.value)}
                    autoComplete="email"
                  />
                  <Input
                    placeholder="Ciudad"
                    value={signupData.ciudad}
                    onChange={event => handleSignupChange('ciudad', event.target.value)}
                    autoComplete="address-level2"
                  />
                  <Input
                    placeholder="Crear contraseña"
                    type="password"
                    value={signupData.password}
                    onChange={event => handleSignupChange('password', event.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                {signupFeedback ? (
                  <p className="text-sm text-primary">{signupFeedback}</p>
                ) : null}
                <Button className="w-full bg-accent hover:bg-accent/90" size="lg" type="submit">
                  Crear cuenta
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={peteLogo} alt="Pete Logo" className="w-8 h-8 rounded-md" />
                <h5 className="text-xl font-bold">Pete</h5>
              </div>
              <p className="text-primary-foreground/80">
                Tu empresa de confianza para servicios del hogar en España.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Servicios</h6>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Fontanería</li>
                <li>Electricidad</li>
                <li>Limpieza</li>
                <li>Handyman</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Empresa</h6>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Sobre Nosotros</li>
                <li>Contacto</li>
                <li>Presupuestos</li>
                <li>Garantías</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contacto</h6>
              <div className="space-y-2 text-primary-foreground/80">
                <p>900 123 456</p>
                <p>info@pete-servicios.es</p>
                <p>Disponible 24/7</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2025 Pete Servicios del Hogar. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <Dialog open={isSignupOpen} onOpenChange={handleSignupOpenChange}>
        <DialogContent className="max-w-xl space-y-6">
          <DialogHeader className="space-y-1">
            <DialogTitle>Crea tu cuenta</DialogTitle>
            <DialogDescription>
              Regístrate para gestionar tus solicitudes, guardar direcciones frecuentes y recibir seguimiento en vivo.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="signup-name">
                  Nombre
                </label>
                <Input
                  id="signup-name"
                  value={signupData.nombre}
                  onChange={event => handleSignupChange('nombre', event.target.value)}
                  placeholder="Nombre completo"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="signup-dni">
                  DNI
                </label>
                <Input
                  id="signup-dni"
                  value={signupData.dni}
                  onChange={event => handleSignupChange('dni', event.target.value)}
                  placeholder="12345678X"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="signup-phone">
                  Teléfono
                </label>
                <Input
                  id="signup-phone"
                  type="tel"
                  value={signupData.telefono}
                  onChange={event => handleSignupChange('telefono', event.target.value)}
                  placeholder="600 123 456"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="signup-email">
                  Email
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  value={signupData.email}
                  onChange={event => handleSignupChange('email', event.target.value)}
                  placeholder="tuemail@ejemplo.com"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="signup-city">
                  Ciudad
                </label>
                <Input
                  id="signup-city"
                  value={signupData.ciudad}
                  onChange={event => handleSignupChange('ciudad', event.target.value)}
                  placeholder="Madrid"
                  autoComplete="address-level2"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="signup-password">
                  Crear contraseña
                </label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signupData.password}
                  onChange={event => handleSignupChange('password', event.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                />
              </div>
            </div>
            {signupFeedback ? (
              <p className="text-sm text-primary">{signupFeedback}</p>
            ) : null}
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => handleSignupOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Crear cuenta</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isLoginOpen} onOpenChange={handleLoginOpenChange}>
        <DialogContent className="max-w-md space-y-6">
          <DialogHeader className="space-y-1">
            <DialogTitle>Iniciar sesión</DialogTitle>
            <DialogDescription>
              Accede con tu email o teléfono para ver tus reservas, facturas y soporte.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={loginMethod === 'email' ? 'default' : 'outline'}
                onClick={() => handleLoginMethodChange('email')}
              >
                Usar email
              </Button>
              <Button
                type="button"
                variant={loginMethod === 'phone' ? 'default' : 'outline'}
                onClick={() => handleLoginMethodChange('phone')}
              >
                Usar teléfono
              </Button>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground" htmlFor="login-identifier">
                {loginMethod === 'email' ? 'Email' : 'Teléfono'}
              </label>
              <Input
                id="login-identifier"
                type={loginMethod === 'email' ? 'email' : 'tel'}
                value={loginData.identifier}
                onChange={event => setLoginData(prev => ({ ...prev, identifier: event.target.value }))}
                placeholder={loginMethod === 'email' ? 'tuemail@ejemplo.com' : '600 123 456'}
                autoComplete={loginMethod === 'email' ? 'email' : 'tel'}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground" htmlFor="login-password">
                Contraseña
              </label>
              <Input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={event => setLoginData(prev => ({ ...prev, password: event.target.value }))}
                placeholder="Tu contraseña"
                autoComplete="current-password"
              />
            </div>
            {loginFeedback ? (
              <p className="text-sm text-primary">{loginFeedback}</p>
            ) : null}
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => handleLoginOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Acceder</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isBookingOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-xl space-y-5">
          <DialogHeader className="space-y-1">
            <DialogTitle>Solicitar Servicio Ahora</DialogTitle>
            <DialogDescription>
              Paso {bookingStep + 1} de {bookingSteps.length}: {bookingSteps[bookingStep]}
            </DialogDescription>
          </DialogHeader>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${((bookingStep + 1) / bookingSteps.length) * 100}%` }}
            />
          </div>
          {renderStepContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
