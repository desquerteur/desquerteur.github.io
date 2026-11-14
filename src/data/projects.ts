// The project file: every project on the site comes from this list.
// Add a project here and it gets a card on the home page, a row in /projects/
// and its own page (= its own subdomain <slug>.desquerteur.com).

export type Status = 'active' | 'released' | 'in-progress' | 'experiment' | 'archived';
export type Category = 'Car & Hardware' | 'Web & Apps' | 'Android' | 'Minecraft' | 'Security' | 'AI Tooling' | 'Windows';

export interface Shot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Card image; defaults to the first screenshot, else a generated cover. */
  cover?: string;
  /** Two-letter mark shown in the Discord-style server rail. */
  mark: string;
  tagline: string;
  description: string[];
  category: Category;
  status: Status;
  /** Accent colour for the project's icon and embed border. */
  color: string;
  featured?: boolean;
  stack: string[];
  features: string[];
  repo?: string;
  links?: { label: string; href: string }[];
  video?: { src: string; poster?: string; label: string };
  shots?: Shot[];
  /** Honest credit for forks and upstream work. */
  credit?: string;
  note?: string;
  year: number;
}

const gh = (repo: string) => `https://github.com/desquerteur/${repo}`;

export const projects: Project[] = [
  {
    slug: 'coscaros',
    name: 'coscarOS',
    mark: 'cO',
    cover: '/projects/coscaros/coscaros-intro-poster.jpg',
    tagline: 'Independent Raspberry Pi car software with a configurable touchscreen dashboard.',
    description: [
      'coscarOS turns a Raspberry Pi with a touchscreen into a full car head unit: a React dashboard you can rearrange, wired and wireless Android Auto, Bluetooth phone services and live OBD vehicle data.',
      'It started as a clean-room study of a commercial car app and grew into its own system – with its own Dashboard Studio, layout packs, OBD logging, verified OTA updates and a black startup screen so the car never shows a Linux boot log.',
    ],
    category: 'Car & Hardware',
    status: 'active',
    color: '#2ee6d6',
    featured: true,
    stack: ['React', 'TypeScript', 'Python', 'Qt', 'Raspberry Pi', 'Android Auto', 'OBD-II'],
    features: [
      'Configurable touchscreen dashboard with Dashboard Studio and layout packs',
      'USB and wireless Android Auto',
      'Bluetooth phone services and audio',
      'Custom OBD gauges, diagnostics and logging',
      'Verified over-the-air software updates',
      'Guided first launch and one-line Pi installer',
    ],
    repo: gh('coscarOS'),
    video: { src: '/projects/coscaros/coscaros-intro.mp4', poster: '/projects/coscaros/coscaros-intro-poster.jpg', label: 'coscarOS intro · 0:42' },
    shots: [
      { src: '/projects/coscaros/dashboard-current.jpg', alt: 'coscarOS dashboard on the touchscreen' },
      { src: '/projects/coscaros/dashboard-studio.jpg', alt: 'Dashboard Studio for arranging widgets' },
      { src: '/projects/coscaros/android-auto-connection.jpg', alt: 'Android Auto connection screen' },
      { src: '/projects/coscaros/my-obd-current.jpg', alt: 'My OBD live vehicle data' },
      { src: '/projects/coscaros/obd-gauges-demo.jpg', alt: 'OBD gauges' },
      { src: '/projects/coscaros/theme-settings-current.jpg', alt: 'Theme settings' },
    ],
    year: 2026,
  },
  {
    slug: 'servesync',
    name: 'ServeSync',
    mark: 'SS',
    tagline: 'A shared restaurant workspace, from the first reservation to the last plate.',
    description: [
      'ServeSync brings seating, reservations, orders, kitchen and bar preparation and payment recording into one workspace. Waiters, cooks, hosts and the owner share the same live service records, each with pages tailored to their job.',
      'It is my biggest project: a React and TypeScript app on Firebase with role-based security, a website integration API and a large, evidence-based test and QA process.',
    ],
    category: 'Web & Apps',
    status: 'in-progress',
    color: '#8b5cf6',
    featured: true,
    stack: ['React 19', 'TypeScript', 'Vite', 'Firebase', 'Firestore Rules', 'Cloud Functions', 'Vitest'],
    features: [
      'Floor plan with tables, rooms and live occupancy',
      'Reservation timeline with free-gap detection',
      'Order drafts that flow to kitchen and bar queues',
      'Payment and settlement recording',
      'Roles for owner, host, waiter, kitchen and bar',
      'Website integration API for online reservations',
    ],
    note: 'Working prototype – the source code is private for now.',
    shots: [
      { src: '/projects/servesync/reservation-timeline-desktop.png', alt: 'Reservation timeline with sample bookings' },
      { src: '/projects/servesync/compact-tables-desktop.png', alt: 'Tables and seating setup' },
      { src: '/projects/servesync/01-floor.jpg', alt: 'Floor view during a simulated shift' },
      { src: '/projects/servesync/06-kitchen.jpg', alt: 'Kitchen preparation queue' },
      { src: '/projects/servesync/07-bar.jpg', alt: 'Bar queue' },
      { src: '/projects/servesync/10-settlement.jpg', alt: 'Settlement at the end of service' },
    ],
    year: 2026,
  },
  {
    slug: 'warden-plus',
    name: 'Warden+',
    mark: 'W+',
    tagline: 'A free, open-source app & website blocker for Android – hard to switch off, easy to live with.',
    description: [
      'Warden+ blocks distracting apps and websites on your phone and makes it genuinely hard to undo in a weak moment. No account, no subscription, no ads, no data collection.',
      'It blocks apps through Android\'s accessibility service and websites in every browser through a local on-device DNS filter – with hosts-list import, schedules, protection levels and better usage stats on top of the original.',
    ],
    category: 'Android',
    status: 'released',
    color: '#5865f2',
    featured: true,
    stack: ['Kotlin', 'Jetpack Compose', 'Android', 'VPN DNS filter', 'Accessibility API'],
    features: [
      'Blocks apps and websites system-wide',
      'Hosts-list import for big blocklists',
      'Schedules, allow-only mode and block-until timers',
      'Protection levels up to device-owner mode',
      'Usage statistics and a setup wizard',
      'Signed APK releases with in-app updates',
    ],
    repo: gh('warden-plus'),
    links: [{ label: 'Download APK', href: 'https://github.com/desquerteur/warden-plus/releases/latest' }],
    video: { src: '/projects/warden-plus/warden-plus-intro.mp4', poster: '/projects/warden-plus/hero.jpg', label: 'Warden+ intro · 0:51' },
    shots: [
      { src: '/projects/warden-plus/hero.jpg', alt: 'Warden+ home, usage and blocklist screens' },
      { src: '/projects/warden-plus/home-dark.jpg', alt: 'Home screen in dark mode' },
      { src: '/projects/warden-plus/usage.jpg', alt: 'Usage statistics' },
      { src: '/projects/warden-plus/schedules.jpg', alt: 'Blocking schedules' },
      { src: '/projects/warden-plus/protection.jpg', alt: 'Protection levels' },
      { src: '/projects/warden-plus/wizard.jpg', alt: 'Setup wizard' },
    ],
    credit: 'Community fork of ChristopherLaughlin/warden – all credit for the original app goes to its author.',
    year: 2026,
  },
  {
    slug: 'packmerger',
    name: 'PackMerger',
    mark: 'PM',
    tagline: 'Merge, host and distribute multiple resource packs on Paper servers – zero config.',
    description: [
      'A Paper plugin that merges many Minecraft resource packs into one, hosts it on a built-in web server and sends it to every player on join.',
      'My fork adds automatic resource-pack discovery for datapacks – including packs a datapack declares on Modrinth – and zero-configuration defaults, so you drop packs in a folder and everything just works.',
    ],
    category: 'Minecraft',
    status: 'released',
    color: '#22c55e',
    featured: true,
    stack: ['Java 25', 'Gradle', 'Paper 26.1+', 'Folia', 'Modrinth API'],
    features: [
      'Merges any number of resource packs into one download',
      'Finds resource packs that belong to datapacks automatically',
      'Built-in pack hosting on the Minecraft port + 1',
      'Hot reload without a server restart',
      'In-game update check against GitHub releases',
    ],
    repo: gh('PackMerger'),
    links: [{ label: 'Latest release', href: 'https://github.com/desquerteur/PackMerger/releases/latest' }],
    credit: 'Fork of pcxgg/PackMerger by PCX Network (MIT).',
    year: 2026,
  },
  {
    slug: 'pwnagotchi-server',
    name: 'Hashcat Pwnagotchi Server',
    mark: 'HP',
    tagline: 'A Linux WPA/WPA2 cracking dashboard built around Hashcat – for your own networks.',
    description: [
      'A web dashboard for security testing of your own Wi-Fi: upload captures, route tasks to CPUs and GPUs, follow the progress and review results. A Pwnagotchi plugin uploads handshakes automatically.',
      'It installs with one command through Docker or CasaOS and updates in place without touching user data.',
    ],
    category: 'Security',
    status: 'active',
    color: '#f43f5e',
    stack: ['Python', 'Docker', 'Nginx', 'Hashcat', 'Bash', 'Cloudflare Tunnel', 'Tailscale'],
    features: [
      'Auto-detects CPUs and GPUs for task routing',
      'Per-device targeting, intensity and queue control',
      'Web UI for uploads, progress, results and users',
      'Pwnagotchi upload plugin',
      'One-line Docker / CasaOS install and safe updates',
    ],
    repo: gh('Hashcat-Pwnagotchi-server'),
    note: 'For testing networks you own or are allowed to test.',
    year: 2026,
  },
  {
    slug: 'multitool',
    name: 'ESP32-S3 Multitool',
    mark: 'MT',
    tagline: 'An open-hardware handheld multitool board that runs ESP32 Marauder and Bruce.',
    description: [
      'A stick-sized ESP32-S3 mainboard I am designing in KiCad 10: display, microSD, sub-GHz radio, NFC, Ethernet, infrared, IMU, RTC and a LiPo charger on one board.',
      'The schematic is generated programmatically and driven through the KiCad MCP server – hardware design as code, with electrical reviews before anything gets ordered.',
    ],
    category: 'Car & Hardware',
    status: 'in-progress',
    color: '#f59e0b',
    stack: ['KiCad 10', 'ESP32-S3', 'CC1101', 'PN532', 'W5500', 'KiCad MCP'],
    features: [
      'ESP32-S3-WROOM-1 with 16 MB flash / 8 MB PSRAM',
      '1.14" display, microSD, buttons, RGB LED and buzzer',
      'Sub-GHz (CC1101), NFC (PN532), Ethernet (W5500), IR TX/RX',
      'USB-C with LiPo charging',
      'Schematic complete: 5 sheets, 74 parts, ERC clean',
    ],
    note: 'Work in progress – the board is not released for ordering yet.',
    shots: [
      { src: '/projects/multitool/render-top.png', alt: 'Multitool board, top render' },
      { src: '/projects/multitool/render-bottom.png', alt: 'Multitool board, bottom render' },
    ],
    year: 2026,
  },
  {
    slug: 'skills',
    name: 'Antigravity Skills',
    mark: 'AS',
    tagline: '455 AI coding skills in 14 categories, with a router plugin for Claude Code.',
    description: [
      'A curated library of skills for AI coding agents like Claude Code, Codex and Antigravity – 427 imported packages with pinned sources plus my own original skills.',
      'A small router plugin loads only the skills a task needs, instead of flooding the agent\'s context with all 455 at once.',
    ],
    category: 'AI Tooling',
    status: 'active',
    color: '#d946ef',
    stack: ['Claude Code plugin', 'Markdown', 'Python', 'Agent skills'],
    features: [
      '455 skills in 14 categories',
      'Claude Code marketplace plugin with automatic routing',
      'Pinned upstream sources and legal notices per package',
      'Searchable Markdown catalog',
    ],
    repo: gh('Antigravity-skills'),
    year: 2026,
  },
  {
    slug: 'minescript',
    name: 'Minescript Travel',
    mark: 'MS',
    tagline: 'Automatic walking, swimming and Elytra travel for Minecraft, in Python.',
    description: [
      'Two Minescript commands that travel to any coordinates on their own: walking and surface swimming along reachable terrain, or rocket-saving Elytra flights above the build limit – with automatic eating on the way.',
    ],
    category: 'Minecraft',
    status: 'released',
    color: '#84cc16',
    stack: ['Python', 'Minescript 5', 'Minecraft 26.3'],
    features: ['\\travel X Z for walking and swimming', '\\travel_elytra for long-distance flights', 'Route check without moving', 'Automatic eating'],
    repo: gh('Minescript-Library'),
    year: 2026,
  },
  {
    slug: 'schematics',
    name: 'Schematic Library',
    mark: 'SL',
    tagline: 'A sorted library of Minecraft farms and builds, for vanilla and Create.',
    description: [
      'Farms and builds sorted by type with one strict naming scheme and size classes derived from each schematic\'s bounding box – so you find the right iron farm in seconds.',
    ],
    category: 'Minecraft',
    status: 'active',
    color: '#14b8a6',
    stack: ['Litematica', 'Schematics', 'Create mod'],
    features: ['Farms and builds in clear categories', 'Consistent snake_case naming', 'Size classes small / medium / large'],
    repo: gh('schematic-library'),
    year: 2026,
  },
  {
    slug: 'website-blocker',
    name: 'Website Blocker for Windows',
    mark: 'WB',
    tagline: 'Blocks distracting sites, URL paths like YouTube Shorts, and apps on Windows.',
    description: [
      'A productivity tool for Windows: whole domains are blocked through the hosts file, single URL paths through Chrome/Edge/Brave policies, and distracting apps get closed automatically. It runs at startup and verifies that blocks really work.',
    ],
    category: 'Windows',
    status: 'released',
    color: '#38bdf8',
    stack: ['Python', 'Windows hosts file', 'Browser policies', 'Batch'],
    features: ['Domain blocking via hosts file', 'URL-path blocking via browser policy', 'App blocking', 'Live verification and tray control panel'],
    repo: gh('Website-blocker-windows'),
    year: 2026,
  },
  {
    slug: 'faster-autostart',
    name: 'faster autostart',
    mark: 'FA',
    tagline: 'A Windows startup manager with launch priority, delays and elevated starts.',
    description: [
      'Manages Windows startup programs with launch order, per-app delays, minimized or background launch and admin-level starts through Task Scheduler – plus an ultra-fast parallel launch mode.',
    ],
    category: 'Windows',
    status: 'released',
    color: '#a78bfa',
    stack: ['C#', '.NET', 'Task Scheduler'],
    features: ['Launch priority and per-app delays', 'Min and background launch modes', 'Elevated startup via Task Scheduler', 'Parallel launch mode'],
    repo: gh('faster-autostart'),
    year: 2026,
  },
  {
    slug: 'zenfocus',
    name: 'ZenFocus',
    mark: 'ZF',
    tagline: 'An ambient workspace for focused work.',
    description: ['A small experiment: a calm, ambient workspace web app built with TypeScript and Gemini.'],
    category: 'Web & Apps',
    status: 'experiment',
    color: '#67e8f9',
    stack: ['TypeScript', 'React', 'Gemini API'],
    features: ['Ambient focus workspace', 'Built in Google AI Studio'],
    repo: gh('ZenFocus'),
    year: 2026,
  },
  {
    slug: 'note4u',
    name: 'Note4U',
    mark: 'N4',
    tagline: 'A notes app experiment with AI help.',
    description: ['An early experiment: a note-taking web app with AI features, built with TypeScript and Gemini.'],
    category: 'Web & Apps',
    status: 'experiment',
    color: '#fda4af',
    stack: ['TypeScript', 'React', 'Gemini API'],
    features: ['Notes with AI assistance', 'Built in Google AI Studio'],
    repo: gh('Note4U'),
    year: 2025,
  },
];

export const statusLabel: Record<Status, string> = {
  active: 'Active',
  released: 'Released',
  'in-progress': 'In progress',
  experiment: 'Experiment',
  archived: 'Archived',
};

export const featured = projects.filter((p) => p.featured);
export const categories = [...new Set(projects.map((p) => p.category))];
