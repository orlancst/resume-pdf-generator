import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import type { CVData } from '../../types/cv';
import { MapPinIcon, MailIcon, PhoneIcon } from './PDFIcons';

const c = {
  primary: '#1a365d',
  accent: '#2b6cb0',
  text: '#2d3748',
  muted: '#718096',
  border: '#e2e8f0',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    color: c.text,
    fontSize: 9,
    lineHeight: 1.4,
  },
  sidebar: {
    width: '35%',
    backgroundColor: c.primary,
    padding: 24,
    paddingTop: 28,
  },
  sidebarContent: {
    flex: 1,
  },
  main: {
    width: '65%',
    padding: 28,
    paddingTop: 32,
    paddingBottom: 48,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
    alignSelf: 'center',
    border: '3px solid rgba(255,255,255,0.25)',
  },
  sidebarName: {
    fontSize: 15,
    fontWeight: 700,
    color: c.white,
    marginBottom: 6,
    textAlign: 'center',
  },
  sidebarHeadline: {
    fontSize: 7.5,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  sidebarSectionTitle: {
    fontSize: 7.5,
    fontWeight: 700,
    color: c.white,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
    marginTop: 14,
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    paddingBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 6,
  },
  contactIcon: {
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactValue: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 8,
    flex: 1,
  },
  skillCategory: {
    marginBottom: 7,
  },
  skillLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: c.white,
    marginBottom: 2,
  },
  skillDetails: {
    fontSize: 7.5,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.5,
  },
  socialItem: {
    fontSize: 7.5,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 3,
  },
  socialNetwork: {
    fontWeight: 600,
    color: c.white,
  },

  mainName: {
    fontSize: 20,
    fontWeight: 700,
    color: c.primary,
    marginBottom: 6,
  },
  mainHeadline: {
    fontSize: 9.5,
    color: c.accent,
    marginBottom: 12,
    fontWeight: 500,
  },
  divider: {
    height: 1,
    backgroundColor: c.border,
    marginBottom: 10,
  },
  sectionWrapper: {
    paddingTop: 14,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: c.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 0,
    borderBottom: `1px solid ${c.border}`,
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 8,
    color: c.text,
    lineHeight: 1.5,
    marginBottom: 3,
  },
  expBlock: {
    marginBottom: 12,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expLeft: {
    flex: 1,
  },
  expPosition: {
    fontSize: 8.5,
    fontWeight: 700,
    color: c.text,
  },
  expCompany: {
    fontSize: 8,
    fontWeight: 500,
    color: c.accent,
    marginBottom: 1,
  },
  expRight: {
    alignItems: 'flex-end',
    flexShrink: 0,
    marginLeft: 8,
  },
  expDate: {
    fontSize: 7,
    color: c.muted,
  },
  expLocation: {
    fontSize: 7,
    color: c.muted,
  },
  expHighlights: {
    marginTop: 2,
    paddingLeft: 10,
  },
  bulletPoint: {
    fontSize: 7.5,
    color: c.text,
    marginBottom: 1.5,
    lineHeight: 1.4,
  },
  eduBlock: {
    marginBottom: 10,
  },
  eduInstitution: {
    fontSize: 8.5,
    fontWeight: 700,
    color: c.text,
  },
  eduArea: {
    fontSize: 7.5,
    color: c.text,
  },
  eduDegree: {
    fontSize: 7,
    color: c.muted,
  },
  eduDate: {
    fontSize: 7,
    color: c.muted,
  },
  hobbyText: {
    fontSize: 7.5,
    color: c.text,
    marginBottom: 2,
  },
  activityBlock: {
    marginBottom: 8,
  },
  activityName: {
    fontSize: 8,
    fontWeight: 600,
    color: c.text,
  },
});

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  if (dateStr === 'present') return 'Present';
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthStr = months[parseInt(m) - 1] || '';
  return monthStr ? `${monthStr} ${y}` : y;
}

export function CVTemplate({ data }: { data: CVData }) {
  const cv = data.cv;
  const sections = cv.sections;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            {cv.photo && (
              <Image src={cv.photo} style={styles.photo} />
            )}
            <Text style={styles.sidebarName}>{cv.name}</Text>
            <Text style={styles.sidebarHeadline}>{cv.headline}</Text>

            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            <View style={styles.contactRow}>
              <View style={styles.contactIcon}><MapPinIcon /></View>
              <Text style={styles.contactValue}>{cv.location}</Text>
            </View>
            <View style={styles.contactRow}>
              <View style={styles.contactIcon}><MailIcon /></View>
              <Text style={styles.contactValue}>{cv.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <View style={styles.contactIcon}><PhoneIcon /></View>
              <Text style={styles.contactValue}>{cv.phone}</Text>
            </View>

            {sections.skills.length > 0 && (
              <>
                <Text style={styles.sidebarSectionTitle}>Skills</Text>
                {sections.skills.map((sk, i) => (
                  <View key={i} style={styles.skillCategory}>
                    <Text style={styles.skillLabel}>{sk.label}</Text>
                    <Text style={styles.skillDetails}>{sk.details}</Text>
                  </View>
                ))}
              </>
            )}

            {cv.social_networks.length > 0 && (
              <>
                <Text style={styles.sidebarSectionTitle}>Social</Text>
                {cv.social_networks.map((sn, i) => (
                  <Text key={i} style={styles.socialItem}>
                    <Text style={styles.socialNetwork}>{sn.network}: </Text>
                    {sn.username}
                  </Text>
                ))}
              </>
            )}
          </View>
        </View>

        <View style={styles.main}>
          <Text style={styles.mainName}>{cv.name}</Text>
          <Text style={styles.mainHeadline}>{cv.headline}</Text>
          <View style={styles.divider} />

          {sections.summary.filter(s => s.trim()).length > 0 && (
            <View style={styles.sectionWrapper} wrap={false}>
              <Text style={styles.sectionTitle}>Profile</Text>
              {sections.summary.filter(s => s.trim()).map((s, i) => (
                <Text key={i} style={styles.summaryText}>{s}</Text>
              ))}
            </View>
          )}

          {sections.experience.filter(e => e.company || e.position).length > 0 && (
            <View style={styles.sectionWrapper} wrap={false}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {sections.experience.filter(e => e.company || e.position).map((exp, i) => (
                <View key={i} style={styles.expBlock} wrap={false}>
                  <View style={styles.expHeaderRow}>
                    <View style={styles.expLeft}>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                      <Text style={styles.expCompany}>{exp.company}</Text>
                    </View>
                    <View style={styles.expRight}>
                      <Text style={styles.expDate}>{formatDate(exp.start_date)} – {formatDate(exp.end_date)}</Text>
                      {exp.location ? <Text style={styles.expLocation}>{exp.location}</Text> : null}
                    </View>
                  </View>
                  {exp.highlights.filter(h => h.trim()).length > 0 && (
                    <View style={styles.expHighlights}>
                      {exp.highlights.filter(h => h.trim()).map((h, hi) => (
                        <Text key={hi} style={styles.bulletPoint}>• {h}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {sections.education.filter(e => e.institution).length > 0 && (
            <View style={styles.sectionWrapper} wrap={false}>
              <Text style={styles.sectionTitle}>Education</Text>
              {sections.education.filter(e => e.institution).map((edu, i) => (
                <View key={i} style={styles.eduBlock} wrap={false}>
                  <View style={styles.expHeaderRow}>
                    <View style={styles.expLeft}>
                      <Text style={styles.eduInstitution}>{edu.institution}</Text>
                      <Text style={styles.eduArea}>{edu.area}</Text>
                    </View>
                    <View style={styles.expRight}>
                      <Text style={styles.eduDegree}>{edu.degree}</Text>
                      <Text style={styles.eduDate}>{formatDate(edu.date)}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {sections.extra_curricular_activities.filter(a => a.name).length > 0 && (
            <View style={styles.sectionWrapper} wrap={false}>
              <Text style={styles.sectionTitle}>Activities</Text>
              {sections.extra_curricular_activities.filter(a => a.name).map((act, i) => (
                <View key={i} style={styles.activityBlock} wrap={false}>
                  <View style={styles.expHeaderRow}>
                    <Text style={styles.activityName}>{act.name}</Text>
                    {act.date ? <Text style={styles.expDate}>{formatDate(act.date)}</Text> : null}
                  </View>
                  {act.highlights.filter(h => h.trim()).length > 0 && (
                    <View style={styles.expHighlights}>
                      {act.highlights.filter(h => h.trim()).map((h, hi) => (
                        <Text key={hi} style={styles.bulletPoint}>• {h}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {sections.hobbies.filter(h => h.bullet.trim()).length > 0 && (
            <View style={styles.sectionWrapper} wrap={false}>
              <Text style={styles.sectionTitle}>Interests</Text>
              {sections.hobbies.filter(h => h.bullet.trim()).map((h, i) => (
                <Text key={i} style={styles.hobbyText}>• {h.bullet}</Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
