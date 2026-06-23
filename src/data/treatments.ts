import { Treatment } from "../types";

export const TREATMENTS: Treatment[] = [
  {
    id: "robotic-joint-replacement",
    name: "Robotic Joint Replacement",
    iconName: "Cpu",
    shortDescription: "Ultra-precise knee and hip replacements using state-of-the-art robotic assistance for faster recovery and longer-lasting stability.",
    overview: "Robotic-assisted joint replacement is a revolution in orthopedic surgery, offering unprecedented accuracy. Dr. Uday Phute utilizes digital 3D planning and real-time robotic feedback during surgery to align implants to within fractions of a millimeter, customized entirely to your unique anatomy.",
    symptoms: [
      "Severe knee or hip pain that limits everyday activities (walking, bending, stairs).",
      "Persistent pain even while resting, or during damp weather.",
      "Stiffness in the joint that significantly restricts range of motion.",
      "Failure to obtain substantial relief from anti-inflammatory drugs, physical therapy, or joint injections."
    ],
    causes: [
      "Osteoarthritis (degenerative joint disease) cartilage wear-and-tear.",
      "Rheumatoid arthritis (chronic systemic auto-immune inflammation).",
      "Post-traumatic arthritis following severe bone fractures or ligament tears."
    ],
    diagnosis: [
      "High-resolution digital X-rays to assess joint space narrowing.",
      "3D CT scanning, which provides a blueprint to formulate the precise robotic cutting guide.",
      "Weight-bearing joint alignment exams and ligament stability testing."
    ],
    treatment: [
      "Robotic-Assisted Total Knee Arthroplasty (TKA) for severe multi-compartment wear.",
      "Robotic Partial Knee Resurfacing targeting localized joint arthritis.",
      "Robotic Total Hip Arthroplasty utilizing digital leg-length and offset balancing."
    ],
    recovery: [
      "Mobilization begins on the same day as surgery to promote circulation.",
      "Reduced post-operative pain owing to highly bone-preserving, muscle-sparing approaches.",
      "Return to normal light daily activities in 2 to 4 weeks with professional physiotherapy."
    ],
    faqs: [
      {
        q: "How does the robot help during the joint surgery?",
        a: "The robotic system does not perform the surgery. Instead, it acts as an intelligent assistant guided by Dr. Uday Phute. It prevents the surgical tool from crossing pre-defined boundaries, ensuring that bones are cut perfectly and soft tissues are 100% protected."
      },
      {
        q: "What is the expected lifespan of a robotic joint replacement?",
        a: "With precise robotic alignment and modern premium materials, these implants can last up to 20 to 25 years or more, significantly reducing the likelihood of revision surgery."
      }
    ],
    image: "/images/treatment-robotic.jpg"
  },
  {
    id: "bone-trauma",
    name: "Bone Trauma Surgery",
    iconName: "Activity",
    shortDescription: "Expert management of complex fractures, multiple trauma injuries, and non-union bone complications.",
    overview: "Bone trauma involves severe structural damage to the musculoskeletal system from accidents, falls, or collisions. Managed with rapid intervention and precise surgical fixation, we reconstruct the anatomy to restore absolute mechanical integrity.",
    symptoms: [
      "Intense local pain and swelling around the bone structure.",
      "Visible deformity, unnatural limb angle, or protruding bone fragments.",
      "Inability to bear weight or move the affected limb."
    ],
    causes: [
      "High-energy impacts from motor vehicle collisions.",
      "Accidental falls, particularly in elderly patients with osteoporotic conditions.",
      "Sports-related high-impact collisions."
    ],
    diagnosis: [
      "Multi-view digital X-rays to establish the fracture geometry.",
      "CT Scan for multi-fragment joint-involving fractures (intra-articular fractures).",
      "Neurological and vascular integrity tests of the limb."
    ],
    treatment: [
      "Open Reduction and Internal Fixation (ORIF) with titanium anatomical plates and screws.",
      "Intramedullary nailing for long-bone fractures (femur, tibia, humerus).",
      "External Fixation configurations to stabilize bones in soft-tissue compromised contexts."
    ],
    recovery: [
      "Initial immobilization followed by early structured joint movement to prevent stiffness.",
      "Bone remodeling takes approximately 6 to 12 weeks depending on age and site.",
      "Gradual rehabilitation program directed at strength restoration and muscle conditioning."
    ],
    faqs: [
      {
        q: "Will the plates and screws need to be removed after healing?",
        a: "Typically, premium titanium plates are perfectly biocompatible and remain in the body forever. Removal is only recommended if they cause irritation, tendon friction, or in pediatric cases."
      }
    ],
    image: "/images/treatment-trauma.jpg"
  },
  {
    id: "joint-pain",
    name: "Joint Pain Treatment",
    iconName: "FlameKindling",
    shortDescription: "Comprehensive care for pain in the shoulder, hip, ankle, and wrist using non-surgical and surgical pathways.",
    overview: "Joint pain can stem from localized wear, cartilage breakdown, or inflammatory arthritis. Dr. Uday Phute offers a step-wise approach combining modern therapeutics, advanced joint preservation therapies, and surgery.",
    symptoms: [
      "Pain, warmth, or swelling around a specific joint.",
      "Grinding or popping sensations (crepitus) during active motion.",
      "Loss of joint range of motion and morning stiffness lasting over 30 minutes."
    ],
    causes: [
      "Wear-and-tear osteocartilage damage.",
      "Crystalline arthropathy (commonly referred to as Gout).",
      "Overuse syndromes and chronic ligament laxity."
    ],
    diagnosis: [
      "Radiological assessment of joint clearance spacings.",
      "Serological tests (Rheumatoid factor, Uric Acid levels, ESR).",
      "Diagnostic joint aspiration in cases of chronic inflammation or suspected gout."
    ],
    treatment: [
      "Preservation therapies including targeted viscosupplementation or PRP injections.",
      "Optimized medical therapy and anti-inflammatory support.",
      "Arthroscopic joint debridement or surgical reconstruction."
    ],
    recovery: [
      "Varies based on therapy. Non-surgical fluid therapies require zero downtime.",
      "Surgical preservation techniques require dedicated 2-to-6 week low-impact rehabilitation.",
      "Patient education on weight loading and joint protective supplements."
    ],
    faqs: [
      {
        q: "When should I consider knee injections for joint pain?",
        a: "Injections are considered when oral medications and physical therapy fail to provide relief, helping delay the need for joint replacement surgery in mild-to-moderate arthritis."
      }
    ],
    image: "/images/treatment-joint-pain.jpg"
  },
  {
    id: "sports-injury",
    name: "Sports Injury Treatment",
    iconName: "Flame",
    shortDescription: "Advanced arthroscopic minimally invasive treatment for ACL/PCL tears, meniscus injuries, and shoulder dislocations.",
    overview: "Athletic injuries require modern, tissue-sparing repair mechanisms. Dr. Phute uses keyhole joint arthroscopy to reconstruct torn ligaments and cushion structures, facilitating a prompt and safe return to active sports.",
    symptoms: [
      "A sudden 'pop' feeling or sound in the knee during pivotal motion.",
      "Rapid swelling, joint instability ('giving way' of the knee or shoulder).",
      "Inability to pivot, run, or support athletic weight."
    ],
    causes: [
      "Pivoting or twisting on a planted foot (ACL tear).",
      "Direct trauma or heavy fall onto an outstretched arm (shoulder dislocation/rotator cuff tear).",
      "Overuse from repetitive running or jumping."
    ],
    diagnosis: [
      "High-field MRI scan to visualize soft tissues like ligaments, tendons, and cartilage.",
      "Clinical stress tests (Lachman test, Pivot-shift, anterior drawer keys)."
    ],
    treatment: [
      "Arthroscopic ACL/PCL ligament reconstruction using autografts (hamstring or patellar tendon).",
      "Meniscal repair or partial meniscectomy.",
      "Shoulder stabilization (Bankart repair) and Rotator Cuff arthroscopic reconstruction."
    ],
    recovery: [
      "Immediate brace protection and crutch support if required.",
      "Structured physical therapy focused on quadriceps/rotator cuff activation.",
      "Return to competitive contact sports in 6 to 9 months post-reconstruction."
    ],
    faqs: [
      {
        q: "Can a torn ACL heal without surgery?",
        a: "A complete ACL tear in active individuals and athletes usually requires reconstruction because it cannot heal on its own and leads to joint instability which ruins cartilage over time."
      }
    ],
    image: "/images/treatment-sports.jpg"
  },
  {
    id: "spondylosis",
    name: "Spondylosis Care",
    iconName: "Layers",
    shortDescription: "Advanced diagnosis and care for age-related wear-and-tear of the neck (cervical) and lower back (lumbar) spine.",
    overview: "Spondylosis refers to spinal osteoarthritis, where bone spurs and dehydrated spinal discs can impinge on neural pathways. We structure pain programs, decompression setups, and posture corrections to alleviate discomfort.",
    symptoms: [
      "Stiffness and a grinding ache in the neck or lower back.",
      "Radiating stiffness in the shoulders, arms (cervical) or hips and thighs (lumbar).",
      "Muscle spasms during sustained standing or sitting."
    ],
    causes: [
      "Natural age-related wear of spinal bones and facet joints.",
      "Chronic strain from desk-bound, forward-head posture.",
      "Genetics and long-term heavy weight loading."
    ],
    diagnosis: [
      "Digital X-rays showing disc space narrowing and osteophyte (bone spur) formations.",
      "Cervical/Lumbar MRI to evaluate spinal canal size and nerve root compression."
    ],
    treatment: [
      "Physiotherapy for neck/core muscle stabilization.",
      "Facet joint block injections or selective epidural injections.",
      "Micro-decompression surgery for persistent, severe nerve entrapment."
    ],
    recovery: [
      "Medical therapy yields relief within 1 to 2 weeks.",
      "Core training must be continued daily to prevent symptomatic recurrence.",
      "Lifestyle modifications (ergonomic desk chairs, frequent standing breaks)."
    ],
    faqs: [
      {
        q: "Is spondylosis curable?",
        a: "Spondylosis is a wear-and-tear degenerative change. While we cannot reverse bone aging, we can completely eliminate pain and stiffness, restoring normal mobility through targeted therapy."
      }
    ],
    image: "/images/treatment-spondylosis.jpg"
  },
  {
    id: "spine-disorders",
    name: "Spine Disorders",
    iconName: "ShieldAlert",
    shortDescription: "Expert care for complex spine problems including herniated discs, sciatica, spinal stenosis, and spinal deformity.",
    overview: "From structural spinal imbalances to disc herniation compressing the delicate spinal cord, Dr. Uday Phute leverages advanced spinal diagnostics to preserve nerve paths and secure structural stability.",
    symptoms: [
      "Burning, electric pain radiating down one leg (sciatica).",
      "Numbness, tingling, or weakness in the feet or hands.",
      "Difficulty walking due to a heavy or tight feeling in the legs (spinal stenosis)."
    ],
    causes: [
      "Herniated or 'slipped' intervertebral discs compression.",
      "Thickening of spinal ligaments compressing the spinal canal.",
      "Osteoporotic spinal compression fractures."
    ],
    diagnosis: [
      "3D spinal MRI for high-fidelity soft tissue imaging.",
      "CT Myelogram or Electromyography (EMG) nerve conduction testing."
    ],
    treatment: [
      "Nerve-root targeted epidural steroid injections.",
      "Microdiscectomy or minimally invasive spinal decompression.",
      "Spinal Fusion (TLIF/PLIF) with high-grade titanium cages for segmental instability."
    ],
    recovery: [
      "Post-microdiscectomy, patients are walking within 24 hours.",
      "No heavy lifting or twisting for 6 weeks.",
      "Gradual core stabilization and ergonomic restoration."
    ],
    faqs: [
      {
        q: "Is spine surgery safe?",
        a: "Yes. With modern microscopic techniques, neuro-monitoring systems, and Dr. Phute's 25+ years of clinical experience, spine micro-surgeries are highly successful with a negligible risk of complications."
      }
    ],
    image: "/images/treatment-spine.jpg"
  },
  {
    id: "back-pain",
    name: "Back Pain Treatment",
    iconName: "Sparkles",
    shortDescription: "Targeted localized treatment for acute and chronic lower back pain, restoring posture and spinal strength.",
    overview: "Over 80% of individuals experience back pain. Dr. Uday Phute evaluates back pain comprehensively to target original pain generators—whether muscle strain, joint inflammation, or disc problems—avoiding unnecessary surgery.",
    symptoms: [
      "Dull ache, stiffness, or sharp muscle spasm across the lower back.",
      "Inability to stand straight or twist without sharp pain.",
      "Pain that worsens after long periods of sitting or upon waking."
    ],
    causes: [
      "Sustained bad posture and poor core abdominal power.",
      "Lumbar muscle strains or ligament sprains.",
      "Degenerative disc changes or facet joint arthritis."
    ],
    diagnosis: [
      "Thorough biomechanical and gait check.",
      "Spinal X-rays to check alignment, lordosis, or skeletal imbalances."
    ],
    treatment: [
      "Personalized physical therapy focusing on McKenzie core strengthening exercises.",
      "Anti-inflammatory medicines, muscle relaxants, and alignment braces.",
      "Trigger point local injections or radiofrequency ablation for chronic facet joints."
    ],
    recovery: [
      "Acute back pain usually resolves in 1 to 4 weeks with physical therapy.",
      "Chronic cases require 6 to 12 weeks of structured muscle balance reconditioning."
    ],
    faqs: [
      {
        q: "Should I rest completely if I have sudden back pain?",
        a: "No. Bed rest for more than 48 hours actually slows recovery. Gentle movement, posture adjustment, and light walking are highly recommended to keep the muscles from going into spasm."
      }
    ],
    image: "/images/treatment-back-pain.jpg"
  },
  {
    id: "neck-pain",
    name: "Neck Pain Treatment",
    iconName: "ThermometerSun",
    shortDescription: "Effective relief for neck spasms, cervical muscle strain, 'tech neck' posture deficits, and radiating nerve pain.",
    overview: "In our digital era, neck pain due to bad posture (tech-neck) has spiked. We offer comprehensive cervical diagnostics, manual therapy schemes, nerve blocks, and postural retraining to restore effortless posture.",
    symptoms: [
      "Aching neck musculature, tightness in shoulders and upper back.",
      "Headaches originating from the base of the skull.",
      "Pins-and-needles sensation extending into the fingers or arms."
    ],
    causes: [
      "Prolonged staring down at smartphones or laptop screens.",
      "Cervical disc bulging or herniation.",
      "Whiplash injuries from sudden acceleration/deceleration events."
    ],
    diagnosis: [
      "Cervical alignment X-ray to examine natural neck curvature (lordosis).",
      "Spinal nerve root conductivity assessment."
    ],
    treatment: [
      "Sustained neck ergonomic education and postural muscle alignment therapy.",
      "Cervical traction and localized soft-tissue manual therapy.",
      "Selective nerve root block if cervical disc bulges irritate nerves."
    ],
    recovery: [
      "Ergonomic changes trigger immediate relief.",
      "Consistent cervical stabilization exercises bolster resistance to pain.",
      "Recovery from cervical nerve spasms takes 2 to 6 weeks."
    ],
    faqs: [
      {
        q: "What is 'Tech Neck' and how can it be prevented?",
        a: "Tech neck occurs when you tilt your head forward to look at screens, increasing the static weight on the spine up to 5 times. Prevent it by lifting screens to eye-level and performing regular neck stretches."
      }
    ],
    image: "/images/treatment-neck-pain.jpg"
  },
  {
    id: "arthritis-care",
    name: "Arthritis Care",
    iconName: "HeartPulse",
    shortDescription: "Multidisciplinary management for Osteoarthritis, Rheumatoid Arthritis, Gout, and other inflammatory bone diseases.",
    overview: "Arthritis management requires patient-centric, custom treatment goals. Dr. Phute couples modern immunological drug profiles with clinical non-surgical lubrication, cartilage support, and joint-conservation methods.",
    symptoms: [
      "Joint swelling, localized warmth, and visible redness.",
      "Morning stiffness in multiple small and large joints.",
      "Deformity of fingers, wrists, or knees over years of untreated flareups."
    ],
    causes: [
      "Auto-immune reactions attacking synovial membranes (Rheumatoid Arthritis).",
      "Age-related structural wear of joint insulation cartilage (Osteoarthritis).",
      "High purine levels in blood causing crystal build-up (Gout)."
    ],
    diagnosis: [
      "Comprehensive systemic blood assays (Rheumatoid Factor, Anti-CCP, C-Reactive Protein).",
      "Joint aspiration fluid crystallization assessment.",
      "Skeletal mapping radiographs."
    ],
    treatment: [
      "Disease-Modifying Anti-Rheumatic Drugs (DMARDs) and biologics consultation.",
      "Intra-articular Hyaluronic Acid lubrication or steroid injections.",
      "Modern joint saving realignment osteotomies."
    ],
    recovery: [
      "Long-term management strategy targeting flareup prevention.",
      "Regular low-impact exercise regime (cycling, swimming) to keep joints fluid.",
      "Anti-inflammatory diet plans paired with high-quality joint building supplements."
    ],
    faqs: [
      {
        q: "Is knee replacement the only cure for arthritis?",
        a: "No. Knee replacement is a highly effective solution for late-stage (Grade 4) arthritis. For early and moderate categories, medications, physical therapy, and joint cartilage injections can preserve the joint for years."
      }
    ],
    image: "/images/treatment-arthritis.jpg"
  },
  {
    id: "fracture-management",
    name: "Fracture Management",
    iconName: "Grid",
    shortDescription: "Comprehensive care for simple and compound fractures, casting, braces, and surgical osteosynthesis.",
    overview: "Whether a pediatric greenstick fracture, an athletic stress fracture, or an osteoporotic fracture in senior patients, Dr. Phute provides expert bone alignment and advanced splinting, casting, and fixation technologies.",
    symptoms: [
      "Immediate, severe localized pain and localized bruising.",
      "Inability to move the extremity or stand.",
      "Swelling, tenderness, or popping sound upon impact."
    ],
    causes: [
      "High impact collisions during road accidents or active sports.",
      "Weakened bone architecture of osteoporotic elderly individuals.",
      "Repetitive impact stresses on normal bone structures."
    ],
    diagnosis: [
      "Digital X-ray for fracture categorization (displaced, greenstick, spiral, comminuted).",
      "Vascular pulse check of the extremity to ensure perfect blood supply."
    ],
    treatment: [
      "Closed fracture reduction (casting and customized splints).",
      "Minimally invasive pinning (K-wires) for pediatric and joint-adjacent structures.",
      "Stable titanium osteosynthesis for accurate visual bone alignment."
    ],
    recovery: [
      "Primary bone fusion takes 4 to 8 weeks depending on fracture size.",
      "Gradual weight-bearing protocols determined strictly by radiological bone callus evidence.",
      "Targeted occupational and physical therapy to overcome post-immobilization stiffness."
    ],
    faqs: [
      {
        q: "How soon can I start walking after a foot/leg fracture?",
        a: "This depends entirely on the stability of the fracture repair. In cast treatments, weight loading may be limited to 6 weeks. For rigidly plated surgical repairs, early partial weight bearing is initiated to accelerate healing safely."
      }
    ],
    image: "/images/treatment-fracture.jpg"
  }
];
