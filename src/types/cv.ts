export interface Highlight {
  highlight: string;
}

export interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  location?: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  area: string;
  degree: string;
  date: string;
  location?: string;
}

export interface Skill {
  label: string;
  details: string;
}

export interface Activity {
  name: string;
  date?: string;
  highlights: string[];
}

export interface Hobby {
  bullet: string;
}

export interface SocialNetwork {
  network: string;
  username: string;
}

export interface CVData {
  cv: {
    name: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    photo?: string;
    sections: {
      summary: string[];
      experience: Experience[];
      education: Education[];
      skills: Skill[];
      extra_curricular_activities: Activity[];
      hobbies: Hobby[];
    };
    social_networks: SocialNetwork[];
  };
}
