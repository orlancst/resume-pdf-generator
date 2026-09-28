export type Language = 'en' | 'es';

export interface Translations {
  app: {
    title: string;
    subtitle: string;
    error: string;
  };
  leftPanel: {
    selectLanguage: string;
    saved: string;
    downloadTemplate: string;
    template: string;
    saving: string;
    saveChanges: string;
    cvFile: string;
    addNewCV: string;
    uploadPhoto: string;
    fullName: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    sections: {
      summary: string;
      experience: string;
      education: string;
      skills: string;
      activities: string;
      hobbies: string;
      socialNetworks: string;
    };
  };
  sectionEditors: {
    summaryParagraph: string;
    experience: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    highlights: string;
    addHighlight: string;
    addExperience: string;
    education: string;
    institution: string;
    areaOfStudy: string;
    degree: string;
    date: string;
    addEducation: string;
    skill: string;
    category: string;
    skills: string;
    addSkill: string;
    activity: string;
    activityName: string;
    details: string;
    addDetail: string;
    addActivity: string;
    hobbyInterest: string;
    addHobby: string;
    network: string;
    username: string;
    addSocialNetwork: string;
  };
  preview: {
    loading: string;
    noData: string;
    pdfPreview: string;
    generating: string;
    downloadPDF: string;
    resumeFileSuffix: string;
  };
  cvTemplate: {
    contact: string;
    skills: string;
    social: string;
    profile: string;
    experience: string;
    education: string;
    activities: string;
    interests: string;
    present: string;
    months: string[];
  };
  placeholders: {
    fullName: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    highlight: string;
    institution: string;
    area: string;
    degree: string;
    date: string;
    educationLocation: string;
    experienceLocation: string;
    category: string;
    skillDetails: string;
    activityName: string;
    activityDate: string;
    activityDetail: string;
    hobby: string;
    network: string;
    username: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    app: {
      title: 'CV Generator',
      subtitle: 'Edit your resume in real time',
      error: 'Error',
    },
    leftPanel: {
      selectLanguage: 'Select language',
      saved: 'Saved!',
      downloadTemplate: 'Download sample template',
      template: 'Template',
      saving: 'Saving...',
      saveChanges: 'Save Changes',
      cvFile: 'CV File',
      addNewCV: 'Add new CV',
      uploadPhoto: 'Upload Photo',
      fullName: 'Full Name',
      headline: 'Headline',
      location: 'Location',
      email: 'Email',
      phone: 'Phone',
      sections: {
        summary: 'Summary',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        activities: 'Activities',
        hobbies: 'Hobbies',
        socialNetworks: 'Social Networks',
      },
    },
    sectionEditors: {
      summaryParagraph: 'Summary Paragraph',
      experience: 'Experience',
      company: 'Company',
      position: 'Position',
      startDate: 'Start Date',
      endDate: 'End Date',
      highlights: 'Highlights',
      addHighlight: 'Add highlight',
      addExperience: 'Add experience',
      education: 'Education',
      institution: 'Institution',
      areaOfStudy: 'Area of Study',
      degree: 'Degree',
      date: 'Date',
      addEducation: 'Add education',
      skill: 'Skill',
      category: 'Category',
      skills: 'Skills',
      addSkill: 'Add skill',
      activity: 'Activity',
      activityName: 'Activity Name',
      details: 'Details',
      addDetail: 'Add detail',
      addActivity: 'Add activity',
      hobbyInterest: 'Hobby / Interest',
      addHobby: 'Add hobby',
      network: 'Network',
      username: 'Username',
      addSocialNetwork: 'Add social network',
    },
    preview: {
      loading: 'Loading CV data...',
      noData: 'No CV data available',
      pdfPreview: 'PDF Preview',
      generating: 'Generating...',
      downloadPDF: 'Download PDF',
      resumeFileSuffix: 'Resume',
    },
    cvTemplate: {
      contact: 'Contact',
      skills: 'Skills',
      social: 'Social',
      profile: 'Profile',
      experience: 'Experience',
      education: 'Education',
      activities: 'Activities',
      interests: 'Interests',
      present: 'Present',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    placeholders: {
      fullName: 'e.g. John Doe',
      headline: 'e.g. Frontend Developer',
      location: 'e.g. New York, USA',
      email: 'e.g. john@example.com',
      phone: 'e.g. +1 234 567 890',
      company: 'e.g. Acme Corp',
      position: 'e.g. Software Engineer',
      startDate: 'e.g. 2020-01',
      endDate: 'e.g. 2023-06',
      highlight: 'e.g. Built feature X',
      institution: 'e.g. MIT',
      area: 'e.g. Computer Science',
      degree: 'e.g. BSc',
      date: 'e.g. 2020-06',
      educationLocation: 'e.g. Cambridge, MA',
      experienceLocation: 'e.g. San Francisco, CA',
      category: 'e.g. Web Development',
      skillDetails: 'e.g. React, Node.js, TypeScript',
      activityName: 'e.g. Volunteer Work',
      activityDate: 'e.g. 2022',
      activityDetail: 'e.g. Organized event',
      hobby: 'e.g. Playing guitar',
      network: 'e.g. LinkedIn',
      username: 'e.g. johndoe',
    },
  },
  es: {
    app: {
      title: 'Generador de CV',
      subtitle: 'Edita tu currículum en tiempo real',
      error: 'Error',
    },
    leftPanel: {
      selectLanguage: 'Seleccionar idioma',
      saved: 'Guardado',
      downloadTemplate: 'Descargar plantilla de ejemplo',
      template: 'Plantilla',
      saving: 'Guardando...',
      saveChanges: 'Guardar cambios',
      cvFile: 'Archivo CV',
      addNewCV: 'Agregar nuevo CV',
      uploadPhoto: 'Subir foto',
      fullName: 'Nombre completo',
      headline: 'Título profesional',
      location: 'Ubicación',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      sections: {
        summary: 'Resumen',
        experience: 'Experiencia',
        education: 'Educación',
        skills: 'Habilidades',
        activities: 'Actividades',
        hobbies: 'Pasatiempos',
        socialNetworks: 'Redes sociales',
      },
    },
    sectionEditors: {
      summaryParagraph: 'Párrafo de resumen',
      experience: 'Experiencia',
      company: 'Empresa',
      position: 'Cargo',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de fin',
      highlights: 'Logros',
      addHighlight: 'Agregar logro',
      addExperience: 'Agregar experiencia',
      education: 'Educación',
      institution: 'Institución',
      areaOfStudy: 'Área de estudio',
      degree: 'Título',
      date: 'Fecha',
      addEducation: 'Agregar educación',
      skill: 'Habilidad',
      category: 'Categoría',
      skills: 'Habilidades',
      addSkill: 'Agregar habilidad',
      activity: 'Actividad',
      activityName: 'Nombre de la actividad',
      details: 'Detalles',
      addDetail: 'Agregar detalle',
      addActivity: 'Agregar actividad',
      hobbyInterest: 'Pasatiempo / Interés',
      addHobby: 'Agregar pasatiempo',
      network: 'Red social',
      username: 'Usuario',
      addSocialNetwork: 'Agregar red social',
    },
    preview: {
      loading: 'Cargando datos del CV...',
      noData: 'No hay datos de CV disponibles',
      pdfPreview: 'Vista previa del PDF',
      generating: 'Generando...',
      downloadPDF: 'Descargar PDF',
      resumeFileSuffix: 'Curriculum',
    },
    cvTemplate: {
      contact: 'Contacto',
      skills: 'Habilidades',
      social: 'Redes Sociales',
      profile: 'Perfil',
      experience: 'Experiencia',
      education: 'Educación',
      activities: 'Actividades',
      interests: 'Intereses',
      present: 'Actualidad',
      months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    placeholders: {
      fullName: 'p. ej. Juan Pérez',
      headline: 'p. ej. Desarrollador Frontend',
      location: 'p. ej. Madrid, España',
      email: 'p. ej. juan@ejemplo.com',
      phone: 'p. ej. +34 612 345 678',
      company: 'p. ej. Empresa S.A.',
      position: 'p. ej. Ingeniero de Software',
      startDate: 'p. ej. 2020-01',
      endDate: 'p. ej. 2023-06',
      highlight: 'p. ej. Desarrollé la función X',
      institution: 'p. ej. Universidad de Madrid',
      area: 'p. ej. Ingeniería Informática',
      degree: 'p. ej. Licenciatura',
      date: 'p. ej. 2020-06',
      educationLocation: 'p. ej. Madrid, España',
      experienceLocation: 'p. ej. Barcelona, España',
      category: 'p. ej. Desarrollo Web',
      skillDetails: 'p. ej. React, Node.js, TypeScript',
      activityName: 'p. ej. Trabajo voluntario',
      activityDate: 'p. ej. 2022',
      activityDetail: 'p. ej. Organicé un evento',
      hobby: 'p. ej. Tocar la guitarra',
      network: 'p. ej. LinkedIn',
      username: 'p. ej. juanperez',
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}
