const survivorPerks = [
    "Ace in the Hole", "Adrenaline", "Aftercare", "Alert", "Any Means Necessary",
    "Apocalyptic Ingenuity", "Appraisal", "Autodidact", "Babysitter", "Background Player",
    "Bada Bada Boom", "Balanced Landing", "Bardic Inspiration", "Better Together", "Better than New",
    "Bite the Bullet", "Blast Mine", "Blood Pact", "Blood Rush", "Boil Over", "Bond",
    "Boon: Circle of Healing", "Boon: Dark Theory", "Boon: Exponential", "Boon: Illumination",
    "Boon: Shadow Step", "Borrowed Time", "Botany Knowledge", "Breakdown", "Breakout", "Buckle Up",
    "Built to Last", "Calm Spirit", "Camaraderie", "Champion of Light", "Change of Plan", "Chemical Trap",
    "Clairvoyance", "Clean Break", "Come and Get Me!", "Conviction", "Corrective Action", "Counterforce",
    "Cut Loose", "Dance With Me", "Dark Sense", "Dead Hard", "Deadline", "Deception", "Decisive Strike",
    "Déjà Vu", "Deliverance", "Desperate Measures", "Detective's Hunch", "Distortion", "Diversion",
    "Do No Harm", "Dramaturgy", "Duty Care", "Empathic Connection", "Empathy", "Extrasensory Perception",
    "Exultation", "Eyes of Belmont", "Fast Track", "Finesse", "Fixated", "Flashbang", "Flip-Flop", "Fogwise",
    "For the People", "Friendly Competition", "Ghost Notes", "Hardened", "Head On", "Hope", "Hyperfocus",
    "Inner Focus", "Inner Strength", "Invocation: Treacherous Crows", "Invocation: Weaving Spiders",
    "Iron Will", "Kindred", "Last Stand", "Leader", "Left Behind", "Light-Footed", "Lightweight", "Lithe",
    "Low Profile", "Lucky Break", "Lucky Star", "Made for This", "Mettle of Man", "Mirrored Illusion",
    "Moment of Glory", "No Mither", "No One Left Behind", "Object of Obsession", "Off the Record",
    "One-Two-Three-Four!", "Open-Handed", "Overcome", "Overzealous", "Parental Guidance", "Pharmacy",
    "Plot Twist", "Plunder's Instinct", "Poised", "Potential Energy", "Power Struggle", "Premonition",
    "Prove Thyself", "Quick & Quiet", "Quick Gambit", "Rapid Response", "Reactive Healing", "Reassurance",
    "Red Herring", "Repressed Alliance", "Residual Manifest", "Resilience", "Resurgence", "Road Life",
    "Rookie Spirit", "Saboteur", "Scavenger", "Scene Partner", "Second Wind", "Self-Care", "Self-Preservation",
    "Shoulder the Burden", "Slippery Meat", "Small Game", "Smash Hit", "Sole Survivor", "Solidarity", "Soul Guard",
    "Specialist", "Spine Chill", "Sprint Burst", "Stake Out", "Still Sight", "Streetwise", "Strength in Shadows",
    "Teamwork: Collective Stealth", "Teamwork: Full Circuit", "Teamwork: Power of Two", "Teamwork: Soft-Spoken",
    "Teamwork: Throw Down", "Teamwork: Toughen Up", "Technician", "Tenacity", "This Is Not Happening",
    "Troubleshooter", "Unbreakable", "Up the Ante", "Urban Evasion", "Vigil", "Visionary", "Wake Up!",
    "We See You", "We'll Make It", "We're Gonna Live Forever", "Wicked", "Windows of Opportunity", "Wiretap"
];

const survivorNames = [
    "Dwight Fairfield", "Meg Thomas", "Claudette Morel", "Jake Park", "Nea Karlsson",
    "Laurie Strode", "Ace Visconti", "Bill Overbeck", "Feng Min", "David King",
    "Quentin Smith", "Detective Tapp", "Kate Denson", "Adam Francis", "Jeff Johansen",
    "Jane Romero", "Ashley J. Williams", "Nancy Wheeler", "Steve Harrington", "Yui Kimura",
    "Zarina Kassir", "Cheryl Mason", "Felix Richter", "Élodie Rakoto", "Yun-Jin Lee",
    "Jill Valentine", "Leon S. Kennedy", "Mikaela Reid", "Jonah Vasquez", "Yoichi Asakawa",
    "Haddie Kaur", "Ada Wong", "Rebecca Chambers", "Vittorio Toscano", "Thalita Lyra",
    "Renato Lyra", "Gabriel Soma", "Nicolas Cage", "Ellen Ripley", "Alan Wake",
    "Sable Ward", "Aestri Yazar", "Lara Croft", "Trevor Belmont", "Taurie Cain",
    "Orela Rose", "Rick Grimes", "Michonne Grimes", "Vee Boonyasak", "Dustin Henderson",
    "Eleven"
];

export const survivorData = Object.freeze({
    perks: survivorPerks,
    names: survivorNames
});