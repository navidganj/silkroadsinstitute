import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  initialCountries,
  initialCities,
  initialProjects,
  initialArchitects,
  initialPractices,
  initialUniversities,
  initialResearchItems,
  initialArchiveCollections,
  initialArchiveItems,
  initialObservatoryDatasets,
  initialNetworkMembers,
  initialCollaborationOpportunities,
  initialPrograms,
  initialEvents,
  initialPublications
} from './src/data/seedData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-Memory Database Store for full runtime modifications via CMS
const db = {
  countries: [...initialCountries],
  cities: [...initialCities],
  projects: [...initialProjects],
  architects: [...initialArchitects],
  practices: [...initialPractices],
  universities: [...initialUniversities],
  research: [...initialResearchItems],
  archiveCollections: [...initialArchiveCollections],
  archiveItems: [...initialArchiveItems],
  observatory: [...initialObservatoryDatasets],
  members: [...initialNetworkMembers],
  opportunities: [...initialCollaborationOpportunities],
  programs: [...initialPrograms],
  events: [...initialEvents],
  publications: [...initialPublications],
  auditLogs: [
    {
      id: 'log-1',
      timestamp: new Date().toISOString(),
      user: 'System Admin',
      action: 'System Seed Initialized',
      entity: 'Platform Core',
      details: 'Loaded 10+ countries, 20+ cities, 50+ projects and research collections.'
    }
  ]
};

// Lazy initialization of Gemini client
let genAI: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    try {
      genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize Gemini client:', e);
    }
  }
  return genAI;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Silk Road Architecture Development Institute API',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });

  // Authentication & Profile Endpoints
  app.post('/api/auth/login', (req, res) => {
    const { email, role = 'member' } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const token = 'sradi_jwt_' + Buffer.from(email).toString('base64');
    db.auditLogs.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      user: email,
      action: 'User Authenticated',
      entity: 'Auth Service',
      details: `Role assigned: ${role}`
    });
    res.json({
      success: true,
      token,
      user: {
        id: 'usr-' + Date.now(),
        email,
        role,
        name: email.split('@')[0],
        organization: 'Silk Road Academic Network'
      }
    });
  });

  app.post('/api/auth/register', (req, res) => {
    const { email, name, role = 'researcher', organization, country } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and full name are required' });
    }
    db.auditLogs.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      user: name,
      action: 'New Researcher Registered',
      entity: 'Membership Registry',
      details: `${organization || 'Independent'}, ${country || 'Silk Road Region'}`
    });
    res.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: 'usr-' + Date.now(),
        email,
        name,
        role,
        organization,
        country
      }
    });
  });

  // REST endpoints
  app.get('/api/countries', (req, res) => {
    res.json(db.countries);
  });

  app.get('/api/cities', (req, res) => {
    const { countryId } = req.query;
    if (countryId) {
      return res.json(db.cities.filter(c => c.countryId === countryId));
    }
    res.json(db.cities);
  });

  app.get('/api/projects', (req, res) => {
    const { countryId, cityId, typology, period } = req.query;
    let list = db.projects;
    if (countryId) list = list.filter(p => p.countryId === countryId);
    if (cityId) list = list.filter(p => p.cityId === cityId);
    if (typology) list = list.filter(p => p.typology === typology);
    if (period) list = list.filter(p => p.historicalPeriod === period);
    res.json(list);
  });

  app.post('/api/projects/submit', (req, res) => {
    const newProject = req.body;
    if (!newProject.title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const record = {
      ...newProject,
      id: 'proj-' + Date.now(),
      submissionStatus: 'submitted',
      isFeaturedHomepage: false
    };
    db.projects.unshift(record);
    db.auditLogs.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      user: req.body.submitter || 'Contributor',
      action: 'Project Submission Created',
      entity: record.title,
      details: `Project proposed in ${record.cityName || 'Unknown city'}`
    });
    res.status(201).json(record);
  });

  app.get('/api/architects', (req, res) => {
    res.json(db.architects);
  });

  app.get('/api/practices', (req, res) => {
    res.json(db.practices);
  });

  app.get('/api/universities', (req, res) => {
    res.json(db.universities);
  });

  app.get('/api/research', (req, res) => {
    res.json(db.research);
  });

  app.get('/api/archive/collections', (req, res) => {
    res.json(db.archiveCollections);
  });

  app.get('/api/archive/items', (req, res) => {
    const { collectionId } = req.query;
    if (collectionId) {
      return res.json(db.archiveItems.filter(i => i.collectionId === collectionId));
    }
    res.json(db.archiveItems);
  });

  app.get('/api/observatory', (req, res) => {
    res.json(db.observatory);
  });

  app.get('/api/members', (req, res) => {
    const { role, country } = req.query;
    let list = db.members;
    if (role) list = list.filter(m => m.role === role);
    if (country) list = list.filter(m => m.country.toLowerCase().includes(String(country).toLowerCase()));
    res.json(list);
  });

  app.get('/api/opportunities', (req, res) => {
    res.json(db.opportunities);
  });

  app.get('/api/programs', (req, res) => {
    res.json(db.programs);
  });

  app.post('/api/programs/apply', (req, res) => {
    const { programId, applicantName, email, statement } = req.body;
    db.auditLogs.unshift({
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      user: applicantName || email || 'Anonymous Applicant',
      action: 'Program Application Received',
      entity: `Program #${programId}`,
      details: statement?.substring(0, 100) || 'Application submitted'
    });
    res.json({ success: true, message: 'Application submitted successfully to review queue.' });
  });

  app.get('/api/events', (req, res) => {
    res.json(db.events);
  });

  app.post('/api/events/rsvp', (req, res) => {
    const { eventId, userName, userEmail } = req.body;
    const evt = db.events.find(e => e.id === eventId);
    if (evt) {
      evt.registeredCount += 1;
      db.auditLogs.unshift({
        id: 'log-' + Date.now(),
        timestamp: new Date().toISOString(),
        user: userName || userEmail || 'Visitor',
        action: 'Event RSVP Registered',
        entity: evt.title,
        details: `Capacity is now ${evt.registeredCount}/${evt.capacity}`
      });
    }
    res.json({ success: true, registeredCount: evt?.registeredCount || 0 });
  });

  app.get('/api/publications', (req, res) => {
    res.json(db.publications);
  });

  // Admin audit logs & metrics
  app.get('/api/admin/metrics', (req, res) => {
    res.json({
      countriesCount: db.countries.length,
      citiesCount: db.cities.length,
      projectsCount: db.projects.length,
      architectsCount: db.architects.length,
      researchCount: db.research.length,
      archiveCount: db.archiveItems.length,
      membersCount: db.members.length,
      datasetsCount: db.observatory.length,
      pendingSubmissionsCount: db.projects.filter(p => p.submissionStatus === 'submitted').length
    });
  });

  app.get('/api/admin/audit', (req, res) => {
    res.json(db.auditLogs);
  });

  // Server-side AI Grounded Assistant endpoint
  app.post('/api/ai/ask', async (req, res) => {
    const { query, language = 'en' } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Grounded deterministic fallback based on indexed records
      const q = query.toLowerCase();
      const matchedProjects = db.projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.materials.some(m => m.toLowerCase().includes(q)) ||
        p.climateStrategies.some(c => c.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );

      const matchedResearch = db.research.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.abstract.toLowerCase().includes(q)
      );

      return res.json({
        answer: language === 'fa'
          ? `پاسخ دانش‌پایه بر اساس بانک اطلاعاتی موسسه توسعه معماری جاده ابریشم:\n\nبر اساس جستجوی «${query}»، اطلاعات مرتبط در پایگاه داده مستندنگاری شده است.`
          : `Grounded synthesis from the Silk Road Architecture Development Institute knowledge base for "${query}".`,
        sources: [
          ...matchedProjects.map(p => ({ title: p.title, type: 'Project', location: `${p.cityName}, ${p.countryName}` })),
          ...matchedResearch.map(r => ({ title: r.title, type: 'Research Paper', doi: r.doi }))
        ],
        isSimulated: true
      });
    }

    try {
      const contextSummary = `
You are the Chief Architectural AI Scholar for the Silk Road Architecture Development Institute (SRADI / موسسه توسعه معماری جاده ابریشم).
Answer the user's architectural inquiry with scholarly rigor, focusing on cross-border knowledge transmission, climatic intelligence, vaulting tectonics, and urban morphology across Iran, Uzbekistan, Turkey, Azerbaijan, Georgia, China, and Pakistan.

Platform records available in database:
- Projects: ${db.projects.map(p => `${p.title} (${p.cityName}, ${p.countryName}, Period: ${p.historicalPeriod}, Materials: ${p.materials.join(', ')})`).join('; ')}
- Research Topics: ${db.research.map(r => r.title).join('; ')}
- Cities: ${db.cities.map(c => `${c.name} (${c.countryName})`).join('; ')}

User language requested: ${language === 'fa' ? 'Persian (Farsi)' : 'English'}.
User inquiry: "${query}"

Provide a concise, scholarly 2-3 paragraph answer citing specific architectural examples and construction techniques from the database. Do not hallucinate facts outside the Silk Road architectural scope.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contextSummary,
      });

      const text = response.text || '';
      res.json({
        answer: text,
        sources: db.projects.slice(0, 3).map(p => ({
          title: p.title,
          type: 'Project Record',
          location: `${p.cityName}, ${p.countryName}`
        })),
        isSimulated: false
      });
    } catch (err: any) {
      console.error('Gemini error:', err);
      res.status(500).json({ error: 'Failed to process AI query', details: err.message });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Silk Road Architecture Development Institute server running on http://localhost:${PORT}`);
  });
}

startServer();
