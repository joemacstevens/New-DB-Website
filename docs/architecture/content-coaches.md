# Coaches Content Spec

## Context
The `/personal-training` landing page (Story 2.2) and the planned `/coaches` experience rely on a shared, structured data source for coach bios. This spec captures the canonical fields and current bios provided by the business team so engineering can create content collections or fixtures without reformatting source material.

## Data Model
- `slug`: Kebab-case identifier for routing (e.g., `/coaches/{slug}`) and collection keys.
- `name`: Coach display name.
- `headline`: One-line hook used in cards and hero callouts.
- `summary`: 1–2 sentence bio supporting detail views.
- `focusTags`: Optional short labels (≤3) highlighting specialties for filtering or badges.
- `socialLinks`: Optional map of platform → URL (e.g., `instagram`, `facebook`, `website`); use `TODO` placeholders until confirmed.
- `certifications`: Optional array of credentials, licenses, or notable achievements for fact panels.

## Coach Entries

| Slug | Name | Headline | Summary | Focus Tags | Social Links | Certifications |
| --- | --- | --- | --- | --- | --- | --- |
| don-somerville | Don Somerville | Golden Gloves champ & mentor | Golden Gloves & Diamond Gloves champ, coach, and community leader. Founder of Different Breed Sports Academy and a mentor to youth inside and outside the ring. Don has led top programs and continues to compete as a 2x Ringside World Champion. | coaching, youth, championships | TODO | — |
| joe-butta | Joe Butta | Coach of pros & youth | 2012 Golden Gloves fighter with 10+ years coaching experience. Joe trains pros and Olympic hopefuls, and brings his background in childhood education to youth and adaptive fitness training. | pros, youth, adaptive | TODO | — |
| daniel-wilson | Daniel Wilson | Holistic boxing & nutrition | Certified trainer and boxing coach promoting holistic health through strength, cardio, and plant-based nutrition. Founder of "Tha Juice God" with over 15 years of experience coaching and managing gyms. | holistic, nutrition, strength | TODO | Certified Trainer |
| coach-dred | Coach D.R.E.D. | Discipline-driven youth mentor | Boxing trainer and school teacher with 19 years of youth mentorship. D.R.E.D. has trained top amateurs and pros, combining fitness and discipline to inspire lasting results. | youth, discipline, education | TODO | — |
| carlos-acevedo | Carlos Acevedo | Mind-body transformation guide | With over 20 years of experience, Carlos is a bilingual NASM-certified trainer known for helping clients transform their lives through fitness, energy work, and holistic wellness. He's also a certified Martial Arts Instructor, Reiki Master, TRX Coach, and Ayurveda Health Counselor, bringing a full-body, mind-centered approach to every session. | holistic, reiki, bilingual | TODO | NASM-CPT; Martial Arts Instructor; Reiki Master; TRX Coach; Ayurveda Health Counselor |
| pablo-gary | Pablo Gary | Championship youth developer | Coach Pablo has over a decade of experience training Golden Gloves champions and pro fighters. Former NYC DOE instructor focused on youth development through boxing and fitness. | youth, champions, education | TODO | — |
| glenda-ortiz | Glenda Ortiz | Trailblazing strength builder | Certified trainer and first woman in Blue Collar Boxing. Glenda helps others find strength through fitness, drawing from her own journey of recovery and transformation. | strength, empowerment, recovery | TODO | Certified Trainer |
| ricardo-castro | Ricardo Castro | Sustainable strength strategist | Coach Caz is a military vet and certified trainer specializing in sustainable strength and fat loss programs. With ISSA and Precision Nutrition certifications, he helps clients reach and maintain real results. | strength, fat-loss, nutrition | TODO | ISSA; Precision Nutrition |
| corey-white | Corey White | Elite speed & agility coach | With a background in Division I football and years of experience coaching elite athletes, Coach Corey leads with energy, precision, and purpose. He specializes in speed, strength, and agility training for youth and adults alike. | speed, agility, strength | TODO | — |
| aadam-ali | Aadam Ali | Hall of Fame youth coach | Aadam Ali is a youth boxing coach with two years of experience helping kids build confidence through fitness and discipline. He's a 5x NJ Golden Gloves Champion, 2017 National Golden Gloves Champion, and was inducted into the NJ Boxing Hall of Fame in 2017. Aadam brings elite experience and a passion for mentoring the next generation. | youth, championships, confidence | TODO | 5x NJ Golden Gloves Champion; 2017 National Golden Gloves Champion; NJ Boxing Hall of Fame Inductee |
| matthew-sorrentino | Matthew Sorrentino | Never give up conditioning | NPTI certified trainer. Certified in CPR/AED and First Aid, Nutrition, TRX, and Kettlebell. Specializes in Strength and Conditioning, HIIT Cardio, and Calisthenics. Enjoys powerlifting, wrestling, soccer, and track and field. Coach Matt's motto: Work hard. Push through. NEVER GIVE UP! | strength, conditioning, hiit | TODO | NPTI; CPR/AED; First Aid; Nutrition Coach; TRX; Kettlebell |
| michelle-buttafuoco | Michelle Buttafuoco | Supportive movement specialist | Michelle holds a Master's in Exercise Science and has over 8 years of coaching experience. She's a certified PE teacher with a strong background in movement and fitness. Michelle creates personalized training plans that help clients of all levels build strength, improve mobility, and feel their best. Her style is supportive, motivating, and focused on real results. | mobility, personalized, supportive | TODO | Master's in Exercise Science; Certified PE Teacher |

## Implementation Notes
- Intended as the source of truth until a CMS or external API owns coach bios.
- Developers can seed `src/content/coaches/` entries with the above fields; ensure bios remain editable without code changes.
- Keep focus tags under three keywords to maintain layout balance on card badges.
- Use `TODO` social placeholders to track outstanding profile URLs; replace with canonical handles before launch.
- Update this document whenever coaches roster changes to preserve traceability for downstream pages.
