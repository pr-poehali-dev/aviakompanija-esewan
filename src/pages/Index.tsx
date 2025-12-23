import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Flight {
  number: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  status: 'on-time' | 'delayed' | 'boarding' | 'departed' | 'landed';
  delay?: number;
  gate?: string;
}

const mockFlights: Flight[] = [
  { number: 'S7-101', from: 'Москва (DME)', to: 'Санкт-Петербург (LED)', departure: '10:30', arrival: '12:00', status: 'on-time', gate: 'A12' },
  { number: 'S7-202', from: 'Новосибирск (OVB)', to: 'Москва (DME)', departure: '14:15', arrival: '16:45', status: 'delayed', delay: 25, gate: 'B8' },
  { number: 'S7-305', from: 'Екатеринбург (SVX)', to: 'Сочи (AER)', departure: '09:00', arrival: '12:30', status: 'boarding', gate: 'C4' },
  { number: 'S7-418', from: 'Владивосток (VVO)', to: 'Москва (DME)', departure: '06:45', arrival: '10:20', status: 'departed' },
  { number: 'S7-523', from: 'Казань (KZN)', to: 'Красноярск (KJA)', departure: '15:30', arrival: '19:45', status: 'landed', gate: 'D15' },
];

const routes = [
  { from: 'Москва', to: 'Санкт-Петербург', price: 'от 3 500 ₽', duration: '1ч 30м', flights: '8 рейсов/день' },
  { from: 'Москва', to: 'Новосибирск', price: 'от 8 900 ₽', duration: '4ч 15м', flights: '6 рейсов/день' },
  { from: 'Екатеринбург', to: 'Сочи', price: 'от 7 200 ₽', duration: '3ч 45м', flights: '4 рейса/день' },
  { from: 'Владивосток', to: 'Москва', price: 'от 15 600 ₽', duration: '8ч 20м', flights: '5 рейсов/день' },
];

const news = [
  { title: 'Запуск новых маршрутов в Сибири', date: '15 декабря 2024', description: 'Открываем прямые рейсы между крупными городами Сибирского региона' },
  { title: 'Обновление флота самолетов', date: '1 декабря 2024', description: 'Пополнение парка современными лайнерами для повышения комфорта пассажиров' },
  { title: 'Программа лояльности расширена', date: '20 ноября 2024', description: 'Новые привилегии и бонусы для постоянных клиентов авиакомпании' },
];

const faqItems = [
  { question: 'Как забронировать билет?', answer: 'Вы можете забронировать билет онлайн на нашем сайте, через мобильное приложение или по телефону горячей линии. Выберите маршрут, дату, заполните данные пассажира и оплатите удобным способом.' },
  { question: 'Какой багаж можно взять с собой?', answer: 'Ручная кладь до 10 кг бесплатно. Зарегистрированный багаж до 23 кг включен в стоимость билета эконом-класса. Для бизнес-класса норма увеличена до 32 кг.' },
  { question: 'Можно ли изменить дату вылета?', answer: 'Да, изменение даты возможно не позднее чем за 24 часа до вылета. Разница в стоимости билетов и сервисный сбор оплачиваются дополнительно.' },
  { question: 'Как отслеживать статус рейса?', answer: 'Введите номер рейса в форме отслеживания на главной странице. Система покажет актуальную информацию о времени вылета, задержках и статусе рейса в реальном времени.' },
];

const getStatusBadge = (status: Flight['status'], delay?: number) => {
  switch (status) {
    case 'on-time':
      return <Badge className="bg-green-500 hover:bg-green-600">Вовремя</Badge>;
    case 'delayed':
      return <Badge variant="destructive">Задержка {delay} мин</Badge>;
    case 'boarding':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Посадка</Badge>;
    case 'departed':
      return <Badge className="bg-purple-500 hover:bg-purple-600">Вылетел</Badge>;
    case 'landed':
      return <Badge className="bg-gray-500 hover:bg-gray-600">Приземлился</Badge>;
  }
};

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchFlight, setSearchFlight] = useState('');
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  const handleFlightSearch = () => {
    if (searchFlight.trim()) {
      const results = mockFlights.filter(flight => 
        flight.number.toLowerCase().includes(searchFlight.toLowerCase()) ||
        flight.from.toLowerCase().includes(searchFlight.toLowerCase()) ||
        flight.to.toLowerCase().includes(searchFlight.toLowerCase())
      );
      setFilteredFlights(results);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Plane" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-secondary">эсэван</h1>
            </div>
            
            <div className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'tracking', label: 'Отслеживание', icon: 'Radio' },
                { id: 'routes', label: 'Маршруты', icon: 'Map' },
                { id: 'about', label: 'О нас', icon: 'Info' },
                { id: 'booking', label: 'Бронирование', icon: 'Ticket' },
                { id: 'news', label: 'Новости', icon: 'Newspaper' },
                { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === item.id 
                      ? 'text-primary bg-primary/10' 
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <Button size="sm" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
                Летайте с комфортом и уверенностью
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Современная авиакомпания с высоким уровнем сервиса. Безопасность, пунктуальность и забота о каждом пассажире.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('booking')} className="text-lg px-8">
                  <Icon name="Ticket" size={20} className="mr-2" />
                  Забронировать билет
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('tracking')} className="text-lg px-8">
                  <Icon name="Radio" size={20} className="mr-2" />
                  Отследить рейс
                </Button>
              </div>
            </div>
            
            <div className="animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/511de3b9-d634-4add-b144-e7c9a3d88e3f/files/a67fd002-0b95-422c-b5fe-4afcafacd962.jpg" 
                alt="Самолет в небе"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="tracking" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Icon name="Radio" size={48} className="mx-auto text-primary mb-4" />
            <h2 className="text-4xl font-bold text-secondary mb-4">Отслеживание рейсов</h2>
            <p className="text-xl text-gray-600">Актуальная информация о статусе рейса в реальном времени</p>
          </div>

          <Card className="max-w-2xl mx-auto mb-8 shadow-lg animate-scale-in">
            <CardHeader>
              <CardTitle>Поиск рейса</CardTitle>
              <CardDescription>Введите номер рейса или название города</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input 
                  placeholder="Например: S7-101 или Москва"
                  value={searchFlight}
                  onChange={(e) => setSearchFlight(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFlightSearch()}
                  className="text-lg"
                />
                <Button onClick={handleFlightSearch} size="lg">
                  <Icon name="Search" size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {(filteredFlights.length > 0 ? filteredFlights : mockFlights).map((flight, index) => (
              <Card key={flight.number} className="hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <div className="text-2xl font-bold text-secondary mb-1">{flight.number}</div>
                      {getStatusBadge(flight.status, flight.delay)}
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Вылет</div>
                      <div className="font-semibold text-lg">{flight.from}</div>
                      <div className="text-primary font-bold text-xl">{flight.departure}</div>
                    </div>

                    <div className="flex items-center justify-center">
                      <Icon name="ArrowRight" size={32} className="text-gray-400" />
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-1">Прилёт</div>
                      <div className="font-semibold text-lg">{flight.to}</div>
                      <div className="text-primary font-bold text-xl">{flight.arrival}</div>
                    </div>
                  </div>
                  
                  {flight.gate && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Icon name="MapPin" size={18} />
                        <span>Выход: <strong>{flight.gate}</strong></span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="py-20 px-4 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Icon name="Map" size={48} className="mx-auto text-primary mb-4" />
            <h2 className="text-4xl font-bold text-secondary mb-4">Популярные маршруты</h2>
            <p className="text-xl text-gray-600">Выгодные цены на направления по всей России</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {routes.map((route, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{route.from} → {route.to}</CardTitle>
                    <Icon name="Plane" size={24} className="text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Цена</span>
                      <span className="text-2xl font-bold text-primary">{route.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Длительность</span>
                      <span className="font-semibold">{route.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Частота</span>
                      <span className="font-semibold">{route.flights}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6" size="lg">Выбрать рейс</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <Icon name="Info" size={48} className="mx-auto text-primary mb-4" />
            <h2 className="text-4xl font-bold text-secondary mb-4">О компании эсэван</h2>
          </div>

          <div className="prose prose-lg max-w-none animate-scale-in">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Авиакомпания эсэван — современный перевозчик, предоставляющий качественные авиационные услуги с 2015 года. 
              Мы гордимся высоким уровнем безопасности, комфорта и клиентского сервиса.
            </p>

            <div className="grid md:grid-cols-3 gap-8 my-12">
              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="pt-8">
                  <Icon name="Users" size={48} className="mx-auto text-primary mb-4" />
                  <div className="text-4xl font-bold text-secondary mb-2">5M+</div>
                  <div className="text-gray-600">Пассажиров в год</div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="pt-8">
                  <Icon name="Plane" size={48} className="mx-auto text-primary mb-4" />
                  <div className="text-4xl font-bold text-secondary mb-2">45</div>
                  <div className="text-gray-600">Самолётов в парке</div>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-all">
                <CardContent className="pt-8">
                  <Icon name="MapPin" size={48} className="mx-auto text-primary mb-4" />
                  <div className="text-4xl font-bold text-secondary mb-2">120+</div>
                  <div className="text-gray-600">Направлений</div>
                </CardContent>
              </Card>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Наш флот состоит из современных воздушных судов, оснащённых всем необходимым для комфортного полёта. 
              Мы регулярно инвестируем в обновление парка и обучение персонала, чтобы каждый полёт был безопасным и приятным.
            </p>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <Icon name="Ticket" size={48} className="mx-auto text-primary mb-4" />
            <h2 className="text-4xl font-bold text-secondary mb-4">Бронирование билетов</h2>
            <p className="text-xl text-gray-600">Простой и быстрый способ забронировать рейс</p>
          </div>

          <Card className="shadow-xl animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Найти билет</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="oneway" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="oneway">В одну сторону</TabsTrigger>
                  <TabsTrigger value="roundtrip">Туда и обратно</TabsTrigger>
                </TabsList>
                
                <TabsContent value="oneway" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Откуда</label>
                      <Input placeholder="Москва" className="text-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Куда</label>
                      <Input placeholder="Санкт-Петербург" className="text-lg" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Дата вылета</label>
                      <Input type="date" className="text-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Пассажиры</label>
                      <Input type="number" defaultValue={1} min={1} className="text-lg" />
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти рейсы
                  </Button>
                </TabsContent>

                <TabsContent value="roundtrip" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Откуда</label>
                      <Input placeholder="Москва" className="text-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Куда</label>
                      <Input placeholder="Санкт-Петербург" className="text-lg" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Туда</label>
                      <Input type="date" className="text-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Обратно</label>
                      <Input type="date" className="text-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Пассажиры</label>
                      <Input type="number" defaultValue={1} min={1} className="text-lg" />
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Icon name="Search" size={20} className="mr-2" />
                    Найти рейсы
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="news" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <Icon name="Newspaper" size={48} className="mx-auto text-primary mb-4" />
            <h2 className="text-4xl font-bold text-secondary mb-4">Новости компании</h2>
            <p className="text-xl text-gray-600">Последние события и обновления</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <Badge className="w-fit mb-2">{item.date}</Badge>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                  <Button variant="link" className="px-0 mt-4">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-gradient-to-b from-white to-sky-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <Icon name="HelpCircle" size={48} className="mx-auto text-primary mb-4" />
            <h2 className="text-4xl font-bold text-secondary mb-4">Часто задаваемые вопросы</h2>
            <p className="text-xl text-gray-600">Ответы на популярные вопросы</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 animate-scale-in">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 shadow-sm">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Plane" size={28} />
                <h3 className="text-2xl font-bold">эсэван</h3>
              </div>
              <p className="text-gray-300">Современная авиакомпания с высоким уровнем сервиса</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#booking" className="hover:text-primary transition-colors">Бронирование</a></li>
                <li><a href="#tracking" className="hover:text-primary transition-colors">Отслеживание рейсов</a></li>
                <li><a href="#routes" className="hover:text-primary transition-colors">Маршруты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#news" className="hover:text-primary transition-colors">Новости</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span>8-800-555-35-35</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span>info@s7airlines.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  <span>Москва, Россия</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2024 Авиакомпания эсэван. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
