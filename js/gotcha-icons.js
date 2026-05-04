/**
 * DUAL-STYLE ICON LIBRARY
 *
 * clean  → minimal white outline for the header order bar
 * sketch → rough pencil-like drawing for the image canvas
 *
 * Same SHAPE, completely different STYLE.
 * Only a human can match them.
 */

const CAPTCHA_ICONS = [

    // ───── STAR ─────
    {
        id: 'star',
        name: 'Star',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <polygon points="32,6 39,24 58,24 43,36 48,55 32,44 16,55 21,36 6,24 25,24"
                     stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <polygon points="${32+j()},${6+j()} ${39+j()},${24+j()} ${58+j()},${24+j()}
                                  ${43+j()},${36+j()} ${48+j()},${55+j()} ${32+j()},${44+j()}
                                  ${16+j()},${55+j()} ${21+j()},${36+j()} ${6+j()},${24+j()}
                                  ${25+j()},${24+j()}"
                         stroke="rgba(210,200,175,0.6)" stroke-width="1.3" fill="none"
                         stroke-linejoin="round" stroke-linecap="round"
                         filter="url(#pencilSketch)"/>
                <line x1="${30+j()}" y1="${18+j()}" x2="${26+j()}" y2="${28+j()}"
                      stroke="rgba(200,190,160,0.2)" stroke-width="0.7"/>
            </svg>`;
        }
    },

    // ───── HEART ─────
    {
        id: 'heart',
        name: 'Heart',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <path d="M32 56 C32 56 8 40 8 22 C8 13 15 6 24 6 C28 6 31 8 32 10
                     C33 8 36 6 40 6 C49 6 56 13 56 22 C56 40 32 56 32 56Z"
                  stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <path d="M${32+j()} ${56+j()} C${30+j()} ${52+j()} ${8+j()} ${40+j()} ${8+j()} ${22+j()}
                         C${8+j()} ${13+j()} ${15+j()} ${6+j()} ${24+j()} ${6+j()}
                         C${28+j()} ${6+j()} ${31+j()} ${8+j()} ${32+j()} ${10+j()}
                         C${33+j()} ${8+j()} ${36+j()} ${6+j()} ${40+j()} ${6+j()}
                         C${49+j()} ${6+j()} ${56+j()} ${13+j()} ${56+j()} ${22+j()}
                         C${56+j()} ${40+j()} ${34+j()} ${52+j()} ${32+j()} ${56+j()}Z"
                      stroke="rgba(210,200,175,0.55)" stroke-width="1.2" fill="none"
                      stroke-linecap="round" stroke-linejoin="round"
                      filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── LIGHTNING ─────
    {
        id: 'lightning',
        name: 'Lightning',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <polygon points="38,4 22,30 32,30 20,60 46,28 34,28 46,4"
                     stroke="white" stroke-width="2" stroke-linejoin="round"
                     stroke-linecap="round" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <polygon points="${38+j()},${4+j()} ${22+j()},${30+j()} ${32+j()},${30+j()}
                                  ${20+j()},${60+j()} ${46+j()},${28+j()} ${34+j()},${28+j()}
                                  ${46+j()},${4+j()}"
                         stroke="rgba(210,200,175,0.6)" stroke-width="1.3" fill="none"
                         stroke-linecap="round" stroke-linejoin="round"
                         filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── CRESCENT MOON ─────
    {
        id: 'moon',
        name: 'Moon',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <path d="M40 8 C28 12 20 24 20 36 C20 50 32 58 44 56
                     C36 56 26 48 26 36 C26 22 34 12 40 8Z"
                  stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <path d="M${40+j()} ${8+j()} C${28+j()} ${12+j()} ${20+j()} ${24+j()} ${20+j()} ${36+j()}
                         C${20+j()} ${50+j()} ${32+j()} ${58+j()} ${44+j()} ${56+j()}
                         C${36+j()} ${56+j()} ${26+j()} ${48+j()} ${26+j()} ${36+j()}
                         C${26+j()} ${22+j()} ${34+j()} ${12+j()} ${40+j()} ${8+j()}Z"
                      stroke="rgba(210,200,175,0.55)" stroke-width="1.2" fill="none"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── DIAMOND ─────
    {
        id: 'diamond',
        name: 'Diamond',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <polygon points="32,4 56,22 32,60 8,22"
                     stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
            <line x1="8" y1="22" x2="56" y2="22" stroke="white" stroke-width="1.5"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <polygon points="${32+j()},${4+j()} ${56+j()},${22+j()} ${32+j()},${60+j()} ${8+j()},${22+j()}"
                         stroke="rgba(210,200,175,0.6)" stroke-width="1.2" fill="none"
                         stroke-linejoin="round" stroke-linecap="round"
                         filter="url(#pencilSketch)"/>
                <line x1="${8+j()}" y1="${22+j()}" x2="${56+j()}" y2="${22+j()}"
                      stroke="rgba(200,190,160,0.35)" stroke-width="0.9"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── CROWN ─────
    {
        id: 'crown',
        name: 'Crown',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <polygon points="8,48 8,20 20,32 32,12 44,32 56,20 56,48"
                     stroke="white" stroke-width="2" stroke-linejoin="round"
                     stroke-linecap="round" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <polygon points="${8+j()},${48+j()} ${8+j()},${20+j()} ${20+j()},${32+j()}
                                  ${32+j()},${12+j()} ${44+j()},${32+j()} ${56+j()},${20+j()}
                                  ${56+j()},${48+j()}"
                         stroke="rgba(210,200,175,0.6)" stroke-width="1.2" fill="none"
                         stroke-linecap="round" stroke-linejoin="round"
                         filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── MUSIC NOTE ─────
    {
        id: 'note',
        name: 'Music Note',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <ellipse cx="22" cy="50" rx="10" ry="7" stroke="white" stroke-width="2" fill="none"/>
            <line x1="32" y1="50" x2="32" y2="10" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 10 C32 10 48 8 48 20" stroke="white" stroke-width="2"
                  stroke-linecap="round" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <ellipse cx="${22+j()}" cy="${50+j()}" rx="10" ry="7"
                         stroke="rgba(210,200,175,0.55)" stroke-width="1.1" fill="none"
                         filter="url(#pencilSketch)"/>
                <line x1="${32+j()}" y1="${50+j()}" x2="${32+j()}" y2="${10+j()}"
                      stroke="rgba(210,200,175,0.6)" stroke-width="1.1"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
                <path d="M${32+j()} ${10+j()} C${32+j()} ${10+j()} ${48+j()} ${8+j()} ${48+j()} ${20+j()}"
                      stroke="rgba(210,200,175,0.5)" stroke-width="1.0"
                      stroke-linecap="round" fill="none" filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── KEY ─────
    {
        id: 'key',
        name: 'Key',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <circle cx="20" cy="22" r="12" stroke="white" stroke-width="2" fill="none"/>
            <circle cx="20" cy="22" r="5" stroke="white" stroke-width="1.5" fill="none"/>
            <line x1="30" y1="28" x2="54" y2="52" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <line x1="46" y1="44" x2="54" y2="38" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <circle cx="${20+j()}" cy="${22+j()}" r="12"
                        stroke="rgba(210,200,175,0.55)" stroke-width="1.1" fill="none"
                        filter="url(#pencilSketch)"/>
                <circle cx="${20+j()}" cy="${22+j()}" r="5"
                        stroke="rgba(200,190,160,0.35)" stroke-width="0.8" fill="none"
                        filter="url(#pencilSketch)"/>
                <line x1="${30+j()}" y1="${28+j()}" x2="${54+j()}" y2="${52+j()}"
                      stroke="rgba(210,200,175,0.6)" stroke-width="1.1"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
                <line x1="${46+j()}" y1="${44+j()}" x2="${54+j()}" y2="${38+j()}"
                      stroke="rgba(210,200,175,0.5)" stroke-width="1.0"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── ANCHOR ─────
    {
        id: 'anchor',
        name: 'Anchor',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="14" r="6" stroke="white" stroke-width="2" fill="none"/>
            <line x1="32" y1="20" x2="32" y2="56" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <line x1="20" y1="32" x2="44" y2="32" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 44 C12 54 22 58 32 58 C42 58 52 54 52 44"
                  stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <circle cx="${32+j()}" cy="${14+j()}" r="6"
                        stroke="rgba(210,200,175,0.55)" stroke-width="1.1" fill="none"
                        filter="url(#pencilSketch)"/>
                <line x1="${32+j()}" y1="${20+j()}" x2="${32+j()}" y2="${56+j()}"
                      stroke="rgba(210,200,175,0.6)" stroke-width="1.1"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
                <line x1="${20+j()}" y1="${32+j()}" x2="${44+j()}" y2="${32+j()}"
                      stroke="rgba(210,200,175,0.5)" stroke-width="1.0"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
                <path d="M${12+j()} ${44+j()} C${12+j()} ${54+j()} ${22+j()} ${58+j()} ${32+j()} ${58+j()}
                         C${42+j()} ${58+j()} ${52+j()} ${54+j()} ${52+j()} ${44+j()}"
                      stroke="rgba(210,200,175,0.5)" stroke-width="1.0"
                      stroke-linecap="round" fill="none" filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── LEAF ─────
    {
        id: 'leaf',
        name: 'Leaf',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <path d="M16 52 C16 52 10 24 32 8 C54 24 48 52 48 52"
                  stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>
            <line x1="32" y1="8" x2="32" y2="52" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="32" y1="24" x2="22" y2="34" stroke="white" stroke-width="1" stroke-dasharray="2 2"/>
            <line x1="32" y1="32" x2="42" y2="42" stroke="white" stroke-width="1" stroke-dasharray="2 2"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <path d="M${16+j()} ${52+j()} C${16+j()} ${52+j()} ${10+j()} ${24+j()} ${32+j()} ${8+j()}
                         C${54+j()} ${24+j()} ${48+j()} ${52+j()} ${48+j()} ${52+j()}"
                      stroke="rgba(210,200,175,0.6)" stroke-width="1.2" fill="none"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
                <line x1="${32+j()}" y1="${8+j()}" x2="${32+j()}" y2="${52+j()}"
                      stroke="rgba(200,190,160,0.35)" stroke-width="0.9"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── FLAME ─────
    {
        id: 'flame',
        name: 'Flame',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <path d="M32 4 C32 4 48 20 48 38 C48 50 40 58 32 58
                     C24 58 16 50 16 38 C16 20 32 4 32 4Z"
                  stroke="white" stroke-width="2" stroke-linejoin="round" fill="none"/>
            <path d="M32 30 C32 30 38 36 38 42 C38 46 36 50 32 50
                     C28 50 26 46 26 42 C26 36 32 30 32 30Z"
                  stroke="white" stroke-width="1.5" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <path d="M${32+j()} ${4+j()} C${32+j()} ${4+j()} ${48+j()} ${20+j()} ${48+j()} ${38+j()}
                         C${48+j()} ${50+j()} ${40+j()} ${58+j()} ${32+j()} ${58+j()}
                         C${24+j()} ${58+j()} ${16+j()} ${50+j()} ${16+j()} ${38+j()}
                         C${16+j()} ${20+j()} ${32+j()} ${4+j()} ${32+j()} ${4+j()}Z"
                      stroke="rgba(210,200,175,0.6)" stroke-width="1.2" fill="none"
                      stroke-linecap="round" stroke-linejoin="round"
                      filter="url(#pencilSketch)"/>
                <path d="M${32+j()} ${30+j()} C${32+j()} ${30+j()} ${38+j()} ${36+j()} ${38+j()} ${42+j()}
                         C${38+j()} ${46+j()} ${36+j()} ${50+j()} ${32+j()} ${50+j()}
                         C${28+j()} ${50+j()} ${26+j()} ${46+j()} ${26+j()} ${42+j()}
                         C${26+j()} ${36+j()} ${32+j()} ${30+j()} ${32+j()} ${30+j()}Z"
                      stroke="rgba(200,190,160,0.3)" stroke-width="0.8" fill="none"
                      filter="url(#pencilSketch)"/>
            </svg>`;
        }
    },

    // ───── BELL ─────
    {
        id: 'bell',
        name: 'Bell',
        clean: `<svg viewBox="0 0 64 64" fill="none">
            <path d="M24 46 C24 46 24 26 32 18 C40 26 40 46 40 46"
                  stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>
            <line x1="18" y1="46" x2="46" y2="46" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <circle cx="32" cy="10" r="4" stroke="white" stroke-width="1.5" fill="none"/>
            <path d="M28 50 C28 54 36 54 36 50" stroke="white" stroke-width="1.5" fill="none"/>
        </svg>`,
        sketch: function(j) {
            return `<svg viewBox="0 0 64 64" fill="none" style="overflow:visible">
                <path d="M${24+j()} ${46+j()} C${24+j()} ${46+j()} ${24+j()} ${26+j()} ${32+j()} ${18+j()}
                         C${40+j()} ${26+j()} ${40+j()} ${46+j()} ${40+j()} ${46+j()}"
                      stroke="rgba(210,200,175,0.6)" stroke-width="1.2" fill="none"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
                <line x1="${18+j()}" y1="${46+j()}" x2="${46+j()}" y2="${46+j()}"
                      stroke="rgba(210,200,175,0.55)" stroke-width="1.0"
                      stroke-linecap="round" filter="url(#pencilSketch)"/>
                <circle cx="${32+j()}" cy="${10+j()}" r="4"
                        stroke="rgba(200,190,160,0.4)" stroke-width="0.8" fill="none"
                        filter="url(#pencilSketch)"/>
                <path d="M${28+j()} ${50+j()} C${28+j()} ${54+j()} ${36+j()} ${54+j()} ${36+j()} ${50+j()}"
                      stroke="rgba(200,190,160,0.3)" stroke-width="0.7" fill="none"/>
            </svg>`;
        }
    }
];