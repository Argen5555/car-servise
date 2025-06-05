import React, { useEffect, useState, useCallback } from "react";
// MUI Core Components
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    useMediaQuery,
    useTheme, // <--- ЭТОТ useTheme ДЛЯ ДОСТУПА К ТЕМЕ ВНУТРИ КОМПОНЕНТА
    CircularProgress,
    Alert,
    Rating,
    Link,
    IconButton,
    Fab // Floating Action Button for potential scroll to top
} from '@mui/material';
// MUI Icons
import {
    Menu as MenuIcon,
    Build,
    DirectionsCar,
    Star,
    MonetizationOn,
    Speed,
    CheckCircleOutline,
    ChevronRight,
    MapOutlined,
    PhoneOutlined,
    MailOutlined,
    Hardware,
    Opacity,
    Settings,
    SettingsBackupRestore,
    Balance,
    DesktopWindows,
    SentimentVerySatisfiedOutlined,
    AccessTimeOutlined,
    AttachMoneyOutlined
} from '@mui/icons-material';

// Theming for Material-UI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// --- Mock Data (assuming src/data/mockData.js exists and is correct) ---
import { mockServices, mockMasters, reviews } from "../data/mockData";

// --- Custom Theme Definition (ОПРЕДЕЛЯЕТСЯ ЗДЕСЬ, НА ВЕРХНЕМ УРОВНЕ МОДУЛЯ) ---
const customTheme = createTheme({ // Переименовал в customTheme, чтобы не путать с хуком useTheme
    palette: {
        primary: {
            main: '#3f51b5', // Deeper blue/indigo
            light: '#757de8',
            dark: '#002984',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ff9800', // Bright orange/amber for accent
            light: '#ffc947',
            dark: '#c66900',
            contrastText: '#ffffff',
        },
        background: {
            default: '#eceff1', // Very light grey background
            paper: '#ffffff', // Card background, clean white
        },
        text: {
            primary: '#212121', // Dark almost black text
            secondary: '#424242', // Dark grey text
        },
        grey: { // Custom grey scale for nuanced backgrounds
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            800: '#424242',
            900: '#212121',
        },
    },
    typography: {
        fontFamily: ['"Montserrat"', '"Open Sans"', 'sans-serif'].join(','),
        h1: {
            fontFamily: '"Montserrat"',
            fontWeight: 700,
            fontSize: '3.8rem',
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
            '@media (max-width:600px)': {
                fontSize: '2.2rem',
            },
        },
        h2: {
            fontFamily: '"Montserrat"',
            fontWeight: 600,
            fontSize: '2.8rem',
            '@media (max-width:900px)': {
                fontSize: '2.2rem',
            },
            '@media (max-width:600px)': {
                fontSize: '1.8rem',
            },
        },
        h3: {
            fontFamily: '"Montserrat"',
            fontWeight: 600,
            fontSize: '1.8rem',
            '@media (max-width:600px)': {
                fontSize: '1.4rem',
            },
        },
        body1: {
            fontFamily: '"Open Sans"',
            fontSize: '1.05rem',
            lineHeight: 1.7,
        },
        body2: {
            fontFamily: '"Open Sans"',
            fontSize: '0.9rem',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '12px 30px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#3f51b5', // Использовать hex напрямую или customTheme.palette.primary.main
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#002984',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#3f51b5',
                    color: '#3f51b5',
                    '&:hover': {
                        backgroundColor: '#757de8',
                        color: '#ffffff',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#ff9800',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#c66900',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#212121', // Использую hex напрямую, чтобы избежать ошибки инициализации
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
            },
        },
    },
});

// --- Styled Components (могут использовать theme непосредственно, так как они определяются на уровне модуля) ---
const HeroSection = styled(Box)(({ theme }) => ({ // theme здесь это customTheme
    background: 'url("https://images.unsplash.com/photo-1580979450379-9133887c941d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover',
    position: 'relative',
    color: theme.palette.primary.contrastText,
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(8, 0),
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(33, 33, 33, 0.7) 0%, rgba(33, 33, 33, 0.5) 100%)',
        zIndex: 1,
    },
    '& .MuiContainer-root': {
        position: 'relative',
        zIndex: 2,
    },
    '& h1': {
        color: theme.palette.primary.contrastText,
        marginBottom: theme.spacing(4),
        textShadow: '3px 3px 10px rgba(0, 0, 0, 0.7)',
    },
    '& p': {
        fontSize: '1.4rem',
        marginBottom: theme.spacing(6),
        color: 'rgba(255, 255, 255, 0.95)',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.2rem',
        },
    },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({ // theme здесь это customTheme
    padding: theme.spacing(10, 0),
    textAlign: 'center',
    '&.alt-bg': {
        backgroundColor: theme.palette.grey[100],
    },
}));

// SectionHeader не использует useTheme(), поэтому может быть простой функцией
const SectionHeader = ({ title, subtitle }) => {
    const themeFromContext = useTheme(); // Получаем тему здесь, внутри компонента
    return (
        <Box sx={{ mb: { xs: 5, md: 10 } }}>
            <Typography variant="h2" component="h2" sx={{ position: 'relative', display: 'inline-block', mb: 1.5, color: 'text.primary' }}>
                {title}
                <Box sx={{
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    bottom: '-10px',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '5px',
                    backgroundColor: themeFromContext.palette.secondary.main, // ИСПОЛЬЗУЕМ themeFromContext
                    borderRadius: '3px',
                }} />
            </Typography>
            {subtitle && (
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mt: 3, fontSize: '1.15rem' }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

// --- Component Specific Mappings for Icons ---
const getServiceIcon = (serviceEmoji) => {
    switch (serviceEmoji) {
        case "🔧": return <Hardware />;
        case "🛢️": return <Opacity />;
        case "⚙️": return <Settings />;
        case "🛞": return <SettingsBackupRestore />;
        case "🛠️": return <Build />;
        case "🔩": return <Hardware />;
        case "⚖️": return <Balance />;
        case "🖥️": return <DesktopWindows />;
        default: return <Build />;
    }
};

// --- Main Landing Component ---
const Landing = () => {
    const [data, setData] = useState({
        services: [],
        masters: [],
    });
    const [loading, setLoading] = useState({
        services: true,
        masters: true,
    });
    const [error, setError] = useState({
        services: null,
        masters: null,
    });

    // ИСПОЛЬЗУЕМ useTheme() ВНУТРИ КОМПОНЕНТА Landing
    // Теперь theme (из useTheme) корректно инициализирована, т.к. Landing обернут в ThemeProvider
    const currentMuiTheme = useTheme();
    const isMobile = useMediaQuery(currentMuiTheme.breakpoints.down('md'));

    const fetchData = useCallback(async (dataType, mockData, delay) => {
        try {
            setLoading(prev => ({ ...prev, [dataType]: true }));
            await new Promise(resolve => setTimeout(resolve, delay));
            setData(prev => ({ ...prev, [dataType]: mockData }));
            setError(prev => ({ ...prev, [dataType]: null }));
        } catch (err) {
            console.error(`Ошибка при загрузке ${dataType}:`, err);
            setError(prev => ({ ...prev, [dataType]: err.message || "Неизвестная ошибка." }));
        } finally {
            setLoading(prev => ({ ...prev, [dataType]: false }));
        }
    }, []);

    useEffect(() => {
        fetchData("services", mockServices, 1000);
        fetchData("masters", mockMasters, 1200);
    }, [fetchData]);

    const [showScrollToTop, setShowScrollToTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // Используем customTheme здесь
        <ThemeProvider theme={customTheme}>
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                {/*=== Навигация (AppBar) ===*/}
                <AppBar position="sticky" sx={{ bgcolor: currentMuiTheme.palette.grey[900], boxShadow: 3 }}>
                    <Container maxWidth="lg">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: currentMuiTheme.palette.common.white }}
                            >
                                <DirectionsCar sx={{ mr: 1, color: currentMuiTheme.palette.secondary.main }} /> CarService
                            </Typography>

                            {isMobile ? (
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={() => alert("Открыть мобильное меню!")}
                                >
                                    <MenuIcon sx={{ color: currentMuiTheme.palette.common.white }} />
                                </IconButton>
                            ) : (
                                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                                    <Link href="#services" color="inherit" underline="none" sx={{ color: currentMuiTheme.palette.common.white, '&:hover': { color: currentMuiTheme.palette.secondary.main } }}>Услуги</Link>
                                    <Link href="#masters" color="inherit" underline="none" sx={{ color: currentMuiTheme.palette.common.white, '&:hover': { color: currentMuiTheme.palette.secondary.main } }}>Мастера</Link>
                                    <Link href="#prices" color="inherit" underline="none" sx={{ color: currentMuiTheme.palette.common.white, '&:hover': { color: currentMuiTheme.palette.secondary.main } }}>Цены</Link>
                                    <Link href="#reviews" color="inherit" underline="none" sx={{ color: currentMuiTheme.palette.common.white, '&:hover': { color: currentMuiTheme.palette.secondary.main } }}>Отзывы</Link>
                                    <Link href="#contact" color="inherit" underline="none" sx={{ color: currentMuiTheme.palette.common.white, '&:hover': { color: currentMuiTheme.palette.secondary.main } }}>Контакты</Link>
                                </Box>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>

                {/*=== Hero / Главный экран ===*/}
                <HeroSection id="home">
                    <Container maxWidth="md">
                        <Typography variant="h1" component="h1">
                            Ваш Автомобиль <br /> Заслуживает Исключительного Ухода
                        </Typography>
                        <Typography variant="body1">
                            Профессиональный ремонт и обслуживание с гарантией качества.
                            Доверьте свой автомобиль экспертам.
                        </Typography>
                        <Box sx={{ mt: 6, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button variant="contained" color="secondary" href="#services">
                                Наши Услуги
                            </Button>
                            <Button variant="outlined" color="primary" href="#contact" endIcon={<ChevronRight />} sx={{ color: 'white', borderColor: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'white' } }}>
                                Записаться Сейчас
                            </Button>
                        </Box>
                    </Container>
                </HeroSection>

                {/*=== Секция «Преимущества» ===*/}
                <SectionWrapper id="advantages">
                    <Container maxWidth="lg">
                        <SectionHeader
                            title="Почему выбирают нас?"
                            subtitle="Мы предлагаем бескомпромиссное качество и надежность для вашего автомобиля."
                        />
                        <Grid container spacing={5} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                                    <Star color="secondary" sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h3" component="h3" gutterBottom>
                                        Высшее качество
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                                        Используем только оригинальные запчасти и современные технологии.
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                                    <AccessTimeOutlined color="secondary" sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h3" component="h3" gutterBottom>
                                        Эффективный сервис
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                                        Минимизируем время ожидания без ущерба для качества.
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                                    <AttachMoneyOutlined color="secondary" sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h3" component="h3" gutterBottom>
                                        Доступные цены
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                                        Конкурентоспособные цены без скрытых платежей.
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </SectionWrapper>

                {/*=== Секция «Услуги» ===*/}
                <SectionWrapper id="services" className="alt-bg">
                    <Container maxWidth="lg">
                        <SectionHeader
                            title="Наши Услуги"
                            subtitle="Мы предлагаем полный спектр услуг для поддержания вашего автомобиля в идеальном состоянии."
                        />
                        {loading.services ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress color="primary" /></Box>
                        ) : error.services ? (
                            <Alert severity="error" sx={{ my: 4 }}>{error.services}</Alert>
                        ) : (
                            <Grid container spacing={4} justifyContent="center">
                                {data.services.length > 0 ? (
                                    data.services.map((service) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
                                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                                                <Box sx={{ fontSize: '4.5rem', color: 'primary.main', mb: 2 }}>
                                                    {getServiceIcon(service.emoji)}
                                                </Box>
                                                <Typography variant="h3" component="h3" gutterBottom sx={{ fontSize: '1.5rem' }}>
                                                    {service.name}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                    <MonetizationOn sx={{ fontSize: '1.2rem' }} /> Цена: <strong>{service.price} ₽</strong>
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                    {service.diagnostic ? <CheckCircleOutline sx={{ fontSize: '1.2rem' }} /> : <Build sx={{ fontSize: '1.2rem' }} />} Диагностика: {service.diagnostic ? "Включена" : "По запросу"}
                                                </Typography>
                                                <Button variant="contained" color="secondary" sx={{ mt: 'auto' }} onClick={() => alert(`Заказать: ${service.name}`)} endIcon={<ChevronRight />}>
                                                    Подробнее
                                                </Button>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>Услуги не найдены.</Typography>
                                )}
                            </Grid>
                        )}
                    </Container>
                </SectionWrapper>

                {/*=== Секция «Мастера» ===*/}
                <SectionWrapper id="masters">
                    <Container maxWidth="lg">
                        <SectionHeader
                            title="Наши Эксперты"
                            subtitle="Познакомьтесь с нашей командой высококвалифицированных специалистов, готовых помочь вам."
                        />
                        {loading.masters ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress color="primary" /></Box>
                        ) : error.masters ? (
                            <Alert severity="error" sx={{ my: 4 }}>{error.masters}</Alert>
                        ) : (
                            <Grid container spacing={5} justifyContent="center">
                                {data.masters.length > 0 ? (
                                    data.masters.map((master) => (
                                        <Grid item xs={12} sm={6} md={4} key={master.id}>
                                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                                                <Box
                                                    sx={{
                                                        width: 120,
                                                        height: 120,
                                                        borderRadius: '50%',
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        fontSize: '3rem',
                                                        fontWeight: 700,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        mb: 3,
                                                        boxShadow: 3
                                                    }}
                                                >
                                                    {master.name.split(" ").map((n) => n[0]).join("")}
                                                </Box>
                                                <Typography variant="h3" component="h3" gutterBottom sx={{ fontSize: '1.6rem' }}>
                                                    {master.name}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    Специальность: <strong>{master.specialty}</strong>
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    Опыт: <strong>{master.experience}</strong>
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                                    Выполнено заказов: <strong>{master.completedOrderIds.length}</strong>
                                                </Typography>
                                                <Button variant="outlined" color="primary" sx={{ mt: 'auto' }} onClick={() => alert(`Подробнее о мастере: ${master.name}`)} endIcon={<ChevronRight />}>
                                                    Профиль
                                                </Button>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>Мастера не найдены.</Typography>
                                )}
                            </Grid>
                        )}
                    </Container>
                </SectionWrapper>

                {/*=== Секция «Цены» ===*/}
                <SectionWrapper id="prices" className="alt-bg">
                    <Container maxWidth="md">
                        <SectionHeader
                            title="Прайс-лист"
                            subtitle="Прозрачные и конкурентные цены на все наши услуги."
                        />
                        {loading.services ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress color="primary" /></Box>
                        ) : error.services ? (
                            <Alert severity="error" sx={{ my: 4 }}>{error.services}</Alert>
                        ) : (
                            <Card sx={{ p: { xs: 2, sm: 5 }, mt: 4 }}>
                                {data.services.length > 0 ? (
                                    data.services.map((service, index) => (
                                        <Box
                                            key={service.id}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                py: 3,
                                                borderBottom: index < data.services.length - 1 ? '1px dashed #e0e0e0' : 'none',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', flexGrow: 1 }}>
                                                <Box sx={{ fontSize: '3rem', mr: 3, flexShrink: 0, color: 'secondary.main' }}>
                                                    {getServiceIcon(service.emoji)}
                                                </Box>
                                                <Box>
                                                    <Typography variant="h3" component="h3" sx={{ fontSize: '1.4rem', m: 0 }}>
                                                        {service.name}
                                                    </Typography>
                                                    {service.diagnostic && (
                                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                            Диагностика включена
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Typography variant="h4" component="span" sx={{ fontWeight: 700, color: 'primary.main', flexShrink: 0 }}>
                                                {service.price} ₽
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>Цены на услуги не найдены.</Typography>
                                )}
                            </Card>
                        )}
                    </Container>
                </SectionWrapper>

                {/*=== Секция «Отзывы» ===*/}
                <SectionWrapper id="reviews">
                    <Container maxWidth="lg">
                        <SectionHeader
                            title="Отзывы Довольных Клиентов"
                            subtitle="Узнайте, что говорят наши клиенты о качестве и надежности нашего сервиса."
                        />
                        <Grid container spacing={5} justifyContent="center">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <Grid item xs={12} sm={6} md={4} key={review.id}>
                                        <Card sx={{ height: '100%', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Box sx={{ fontSize: '3.5rem', mb: 2, color: 'primary.main' }}>
                                                {review.avatar || <SentimentVerySatisfiedOutlined sx={{ fontSize: '3.5rem' }} />}
                                            </Box>
                                            <Typography variant="h3" component="h3" gutterBottom sx={{ fontSize: '1.5rem' }}>
                                                {review.author}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2, textAlign: 'center' }}>
                                                "{review.text}"
                                            </Typography>
                                            <Rating name={`rating-${review.id}`} value={review.rating} readOnly sx={{ color: 'secondary.main', mb: 1 }} />
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>Отзывы пока отсутствуют. Будьте первым, кто оставит отзыв!</Typography>
                            )}
                        </Grid>
                    </Container>
                </SectionWrapper>

                {/*=== Секция «Контакты» ===*/}
                <SectionWrapper id="contact" className="alt-bg">
                    <Container maxWidth="lg">
                        <SectionHeader
                            title="Свяжитесь с Нами"
                            subtitle="Мы всегда готовы ответить на ваши вопросы и помочь с любыми проблемами."
                        />
                        <Grid container spacing={5} justifyContent="center" sx={{ mt: 4 }}>
                            <Grid item xs={12} md={5}>
                                <Card sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                            <MapOutlined color="primary" sx={{ mr: 2, fontSize: '2.5rem' }} />
                                            <Typography variant="body1">
                                                <strong>Адрес:</strong> г. Бишкек, ул. Примерная, 123
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                            <PhoneOutlined color="primary" sx={{ mr: 2, fontSize: '2.5rem' }} />
                                            <Typography variant="body1">
                                                <strong>Телефон:</strong> <Link href="tel:+996555123456" color="inherit" underline="hover">+996 (555) 123-456</Link>
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                                            <MailOutlined color="primary" sx={{ mr: 2, fontSize: '2.5rem' }} />
                                            <Typography variant="body1">
                                                <strong>Email:</strong> <Link href="mailto:info@carservice.kg" color="inherit" underline="hover">info@carservice.kg</Link>
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button variant="contained" color="secondary" fullWidth size="large">
                                        Записаться онлайн
                                    </Button>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Card sx={{ p: { xs: 1, sm: 2 }, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {/* Placeholder for Google Maps iframe */}
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11690.41908077598!2d74.59560427845763!3d42.87652758252277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7d160273a55%3A0x7d0799797d4c9f1a!2z0JHQsNC80LzQuNGA0LA!5e0!3m2!1sru!2skg!4v1717565427181!5m2!1sru!2skg"
                                        width="100%"
                                        height="450"
                                        style={{ border: 0, borderRadius: '8px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Расположение CarService на карте Бишкек"
                                    ></iframe>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </SectionWrapper>

                {/*=== Футер ===*/}
                <Box component="footer" sx={{ bgcolor: currentMuiTheme.palette.grey[900], color: 'white', py: 5, textAlign: 'center' }}>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 3, mb: 3 }}>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: currentMuiTheme.palette.secondary.main }}>
                                <DirectionsCar sx={{ mr: 1 }} /> CarService
                            </Typography>
                            <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Link href="#services" color="inherit" underline="hover" sx={{ color: 'white' }}>Услуги</Link>
                                <Link href="#masters" color="inherit" underline="hover" sx={{ color: 'white' }}>Мастера</Link>
                                <Link href="#reviews" color="inherit" underline="hover" sx={{ color: 'white' }}>Отзывы</Link>
                                <Link href="#contact" color="inherit" underline="hover" sx={{ color: 'white' }}>Контакты</Link>
                            </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} CarService. Все права защищены.
                        </Typography>
                    </Container>
                </Box>

                {/* Optional: Scroll to Top Button */}
                {showScrollToTop && (
                    <Fab
                        color="secondary"
                        size="small"
                        aria-label="scroll back to top"
                        sx={{ position: 'fixed', bottom: { xs: 16, md: 32 }, right: { xs: 16, md: 32 } }}
                        onClick={scrollToTop}
                    >
                        <ChevronRight sx={{ transform: 'rotate(-90deg)' }} />
                    </Fab>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default Landing;