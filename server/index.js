import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const curriculumsDir = path.resolve(__dirname, '..', 'curriculums');
const uploadsDir = path.resolve(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `photo-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const DEFAULT_CV = {
  cv: {
    name: 'Your Name',
    headline: 'Your Headline',
    location: 'Your Location',
    email: 'your.email@example.com',
    phone: '+1 234 567 890',
    photo: '',
    sections: {
      summary: ['Your professional summary goes here.'],
      experience: [
        {
          company: 'Company Name',
          position: 'Job Title',
          start_date: 'YYYY-MM',
          end_date: 'present',
          location: '',
          highlights: ['Achievement or responsibility'],
        },
      ],
      education: [
        {
          institution: 'University Name',
          area: 'Field of Study',
          degree: 'Degree',
          date: 'YYYY-MM',
          location: '',
        },
      ],
      skills: [
        { label: 'Skill Category', details: 'Skill1, Skill2, Skill3' },
      ],
      extra_curricular_activities: [],
      hobbies: [{ bullet: 'Your hobbies and interests' }],
    },
    social_networks: [
      { network: 'GitHub', username: 'yourusername' },
    ],
  },
};

function ensureCurriculumsDir() {
  if (!fs.existsSync(curriculumsDir)) {
    fs.mkdirSync(curriculumsDir, { recursive: true });
  }
  const files = fs.readdirSync(curriculumsDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  if (files.length === 0) {
    const defaultPath = path.join(curriculumsDir, 'cv.yaml');
    fs.writeFileSync(defaultPath, yamlDump(DEFAULT_CV, { lineWidth: 120, noRefs: true, quotingType: '"', forceQuotes: false }), 'utf-8');
  }
}

app.get('/api/cv-files', (_req, res) => {
  try {
    ensureCurriculumsDir();
    const files = fs.readdirSync(curriculumsDir)
      .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
      .map(f => ({ name: f, path: f }));
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cv-files/:filename', (req, res) => {
  try {
    ensureCurriculumsDir();
    const filepath = path.join(curriculumsDir, req.params.filename);
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    const content = fs.readFileSync(filepath, 'utf-8');
    const data = yamlLoad(content);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cv-files/:filename', (req, res) => {
  try {
    ensureCurriculumsDir();
    const filepath = path.join(curriculumsDir, req.params.filename);
    const yamlStr = yamlDump(req.body, { lineWidth: 120, noRefs: true, quotingType: '"', forceQuotes: false });
    fs.writeFileSync(filepath, yamlStr, 'utf-8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const templatesDir = path.resolve(__dirname, '..', 'templates');

app.get('/api/download-template', (_req, res) => {
  const filepath = path.join(templatesDir, 'cv-template.yaml');
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: 'Template file not found' });
  }
  const content = fs.readFileSync(filepath, 'utf-8');
  res.setHeader('Content-Type', 'application/x-yaml');
  res.setHeader('Content-Disposition', 'attachment; filename="cv-template.yaml"');
  res.send(content);
});

app.use('/uploads', express.static(uploadsDir));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  ensureCurriculumsDir();
});
