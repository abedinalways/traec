(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shared/ExpertCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const providersData = [
    {
        id: '1',
        name: 'Sarah Johnson',
        title: 'Wedding Photographer',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234
    },
    {
        id: '2',
        name: 'Jenny Wilson',
        title: 'Event Manager',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234
    },
    {
        id: '3',
        name: 'Cody Fisher',
        title: 'DJ',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234
    },
    {
        id: '4',
        name: 'Floyd Miles',
        title: 'Catering',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234
    },
    {
        id: '5',
        name: 'Robert Fox',
        title: 'Decorator',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234
    },
    {
        id: '6',
        name: 'Eleanor Pena',
        title: 'Entertainment',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234
    }
];
// CarouselItem wrapper with fixed width for stable infinite scrolling
const CarouselItem = ({ children, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `min-w-0 flex-[0_0_auto] w-[280px] ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
        lineNumber: 86,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = CarouselItem;
const ExpertsCarousel = ()=>{
    _s();
    const carouselRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    // Define dimensions for infinite scroll stability
    const CARD_WIDTH = 280; // Matches w-[280px] in CarouselItem
    const GAP_WIDTH = 20; // Matches gap-5
    const ITEM_WIDTH = CARD_WIDTH + GAP_WIDTH; // 300px total space per item
    const dataLength = providersData.length;
    const TRANSITION_WIDTH = dataLength * ITEM_WIDTH; // Width of one full block of data
    // Duplicate the data 3 times: [A][B][C] for seamless looping
    const providersToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "ExpertsCarousel.useMemo[providersToRender]": ()=>{
            return [
                ...providersData,
                ...providersData,
                ...providersData
            ];
        }
    }["ExpertsCarousel.useMemo[providersToRender]"], []);
    // Scrolls forward by one item's width
    const scrollNext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ExpertsCarousel.useCallback[scrollNext]": ()=>{
            if (carouselRef.current) {
                carouselRef.current.scrollBy({
                    left: ITEM_WIDTH,
                    behavior: 'smooth'
                });
            }
        }
    }["ExpertsCarousel.useCallback[scrollNext]"], [
        ITEM_WIDTH
    ]);
    // Scrolls backward by one item's width
    const scrollPrev = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ExpertsCarousel.useCallback[scrollPrev]": ()=>{
            if (carouselRef.current) {
                carouselRef.current.scrollBy({
                    left: -ITEM_WIDTH,
                    behavior: 'smooth'
                });
            }
        }
    }["ExpertsCarousel.useCallback[scrollPrev]"], [
        ITEM_WIDTH
    ]);
    // --- Auto-Run Logic (Scrolls every 3 seconds) ---
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ExpertsCarousel.useEffect": ()=>{
            if (providersData.length === 0) return;
            const intervalId = setInterval(scrollNext, 3000);
            return ({
                "ExpertsCarousel.useEffect": ()=>clearInterval(intervalId)
            })["ExpertsCarousel.useEffect"];
        }
    }["ExpertsCarousel.useEffect"], [
        scrollNext
    ]);
    // --- Infinite Wrap Logic (The key to seamless looping) ---
    const handleScroll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "ExpertsCarousel.useCallback[handleScroll]": ()=>{
            if (!carouselRef.current) return;
            const { scrollLeft } = carouselRef.current;
            // Check if we have scrolled past the middle block (Block B -> Block C)
            if (scrollLeft >= 2 * TRANSITION_WIDTH) {
                carouselRef.current.scrollLeft = TRANSITION_WIDTH;
            } else if (scrollLeft < TRANSITION_WIDTH - ITEM_WIDTH) {
                carouselRef.current.scrollLeft = 2 * TRANSITION_WIDTH - ITEM_WIDTH;
            }
        }
    }["ExpertsCarousel.useCallback[handleScroll]"], [
        TRANSITION_WIDTH,
        ITEM_WIDTH
    ]);
    // Effect to set the initial scroll position to the start of the middle block (B)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ExpertsCarousel.useEffect": ()=>{
            if (carouselRef.current) {
                setTimeout({
                    "ExpertsCarousel.useEffect": ()=>{
                        if (carouselRef.current) {
                            carouselRef.current.scrollLeft = TRANSITION_WIDTH;
                        }
                    }
                }["ExpertsCarousel.useEffect"], 0);
            }
        }
    }["ExpertsCarousel.useEffect"], [
        TRANSITION_WIDTH
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: carouselRef,
                        onScroll: handleScroll,
                        className: "flex gap-5 overflow-x-scroll no-scrollbar py-2 scroll-smooth touch-pan-x",
                        children: providersToRender.map((provider, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselItem, {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-full h-[200px] bg-gray-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: provider.imageUrl,
                                                    alt: provider.name,
                                                    className: "w-full h-full object-cover",
                                                    onError: (e)=>{
                                                        const target = e.target;
                                                        target.src = 'https://placehold.co/400x400/CCCCCC/333333?text=No+Image';
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-base font-semibold text-gray-900",
                                                        children: provider.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: provider.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between pt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1 text-gray-500",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                                        lineNumber: 195,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs",
                                                                        children: provider.location
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                                        lineNumber: 196,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                        className: "w-4 h-4 fill-amber-400 text-amber-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                                        lineNumber: 201,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-gray-900",
                                                                        children: provider.rating
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                                        lineNumber: 202,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: [
                                                                            "(",
                                                                            provider.reviewCount,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                                        lineNumber: 205,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        className: "w-full mt-3",
                                                        onClick: ()=>console.log('View profile:', provider.id),
                                                        children: "View Profile"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                                lineNumber: 182,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, `${provider.id}-${index}`, false, {
                                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: scrollPrev,
                        size: "icon",
                        variant: "secondary",
                        className: "absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg border hover:bg-gray-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4 text-gray-600",
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                points: "15 18 9 12 15 6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: scrollNext,
                        size: "icon",
                        variant: "secondary",
                        className: "absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg border hover:bg-gray-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4 text-gray-600",
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                points: "9 18 15 12 9 6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                            lineNumber: 252,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/ExpertCarousel.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ExpertsCarousel, "Fh7EMVDYtMmJFW32dysjIWdgl0c=");
_c1 = ExpertsCarousel;
const __TURBOPACK__default__export__ = ExpertsCarousel;
var _c, _c1;
__turbopack_context__.k.register(_c, "CarouselItem");
__turbopack_context__.k.register(_c1, "ExpertsCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/Experts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Experts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$ExpertCarousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/ExpertCarousel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const providers = [
    {
        id: 1,
        name: 'Sarah Johnson',
        profession: 'Wedding Photographer',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234,
        image: '/images/experts/experts01.png'
    },
    {
        id: 2,
        name: 'Jenny Wilson',
        profession: 'Event Manager',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234,
        image: '/images/experts/experts02.png'
    },
    {
        id: 3,
        name: 'Cody Fisher',
        profession: 'DJ',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234,
        image: '/images/experts/experts03.png'
    },
    {
        id: 4,
        name: 'Floyd Miles',
        profession: 'Catering',
        location: 'New York NY',
        rating: 4.9,
        reviewCount: 234,
        image: '/images/experts/experts04.png'
    }
];
// Duplicate for infinite loop
const infiniteData = [
    ...providers,
    ...providers,
    ...providers
];
function Experts() {
    _s();
    const [index, setIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(0);
    const [isTransitioning, setIsTransitioning] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(true);
    const cardWidth = 310; // 302px card + 8px gap
    // Create triple array for seamless infinite scroll
    const infiniteData = [
        ...providers,
        ...providers,
        ...providers
    ];
    const startIndex = providers.length;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Experts.useEffect": ()=>{
            // Reset to middle section without animation when reaching boundaries
            if (index >= providers.length * 2) {
                setIsTransitioning(false);
                setIndex(providers.length);
                setTimeout({
                    "Experts.useEffect": ()=>setIsTransitioning(true)
                }["Experts.useEffect"], 50);
            } else if (index <= 0) {
                setIsTransitioning(false);
                setIndex(providers.length);
                setTimeout({
                    "Experts.useEffect": ()=>setIsTransitioning(true)
                }["Experts.useEffect"], 50);
            }
        }
    }["Experts.useEffect"], [
        index
    ]);
    const handleNext = ()=>{
        if (isTransitioning) {
            setIndex((prev)=>prev + 1);
        }
    };
    const handlePrev = ()=>{
        if (isTransitioning) {
            setIndex((prev)=>prev - 1);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full mx-auto py-12 px-4 md:px-8 relative bg-[#FFFBF7]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
                        children: [
                            "Expert Service",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 italic font-serif",
                                children: "Providers"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/Experts.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/Experts.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-sm md:text-base max-w-2xl mx-auto",
                        children: "Connect with our top-rated professionals who consistently deliver exceptional results"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/Experts.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/Experts.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$ExpertCarousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/sections/Experts.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/Experts.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(Experts, "RRPekD7XM+gefwH7VhSF1HE0ySU=");
_c = Experts;
var _c;
__turbopack_context__.k.register(_c, "Experts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/shared/CategoryCarousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Data updated to use placeholder images that visually match the original screenshot content.
const categoriesData = [
    {
        id: 'dj_services',
        name: 'DJ Services',
        // Placeholder for DJ mixing board
        imageUrl: '/images/featured01.png',
        bgColorClass: 'bg-green-50'
    },
    {
        id: 'decorators',
        name: 'Decorators',
        // Placeholder for wedding arch/decor
        imageUrl: '/images/featured02.png',
        bgColorClass: 'bg-orange-50'
    },
    {
        id: 'catering',
        name: 'Catering',
        // Placeholder for catered appetizers on a tray
        imageUrl: '/images/featured03.png',
        bgColorClass: 'bg-cyan-50'
    },
    {
        id: 'rentals',
        name: 'Rentals',
        // Placeholder for people holding hands/items
        imageUrl: '/images/featured04.png',
        bgColorClass: 'bg-purple-50/70'
    },
    {
        id: 'photography',
        name: 'Photography',
        // Placeholder for a camera
        imageUrl: '/images/featured05.png',
        bgColorClass: 'bg-pink-50'
    },
    {
        id: 'entertainment',
        name: 'Entertainment',
        // Placeholder for people partying/clubbing
        imageUrl: '/images/featured06.png',
        bgColorClass: 'bg-indigo-50'
    }
];
// Mock for CarouselItem - wraps content in a fixed card size for infinite stability
const CarouselItem = ({ children, className })=>// Using a fixed width of 200px for reliable infinite loop scrolling calculation
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `min-w-0 flex-[0_0_auto] w-[200px] ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = CarouselItem;
// Mock for Card - the main container for each category
const Card = ({ children, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl transition-shadow duration-300 overflow-hidden cursor-pointer bg-white ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
        lineNumber: 78,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = Card;
// Mock for Button (Navigation)
const Button = ({ children, onClick, className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg border border-gray-100 hover:scale-105 transition-all duration-200 ${className}`,
        "aria-label": "Navigation Button",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
        lineNumber: 89,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = Button;
const CategoryCarousel = ()=>{
    _s();
    const carouselRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    // Define dimensions for infinite scroll stability
    const CARD_WIDTH = 200; // Matches w-[200px] in CarouselItem
    const GAP_WIDTH = 20; // Matches space-x-5 (1.25rem)
    const ITEM_WIDTH = CARD_WIDTH + GAP_WIDTH; // 220px total space per item
    const dataLength = categoriesData.length;
    const TRANSITION_WIDTH = dataLength * ITEM_WIDTH; // Width of one full block of data
    // Duplicate the data 3 times: [A][B][C] for seamless looping
    const categoriesToRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "CategoryCarousel.useMemo[categoriesToRender]": ()=>{
            return [
                ...categoriesData,
                ...categoriesData,
                ...categoriesData
            ];
        }
    }["CategoryCarousel.useMemo[categoriesToRender]"], []);
    // Scrolls forward by one item's width
    const scrollNext = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "CategoryCarousel.useCallback[scrollNext]": ()=>{
            if (carouselRef.current) {
                carouselRef.current.scrollBy({
                    left: ITEM_WIDTH,
                    behavior: 'smooth'
                });
            }
        }
    }["CategoryCarousel.useCallback[scrollNext]"], [
        ITEM_WIDTH
    ]);
    // Scrolls backward by one item's width
    const scrollPrev = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "CategoryCarousel.useCallback[scrollPrev]": ()=>{
            if (carouselRef.current) {
                carouselRef.current.scrollBy({
                    left: -ITEM_WIDTH,
                    behavior: 'smooth'
                });
            }
        }
    }["CategoryCarousel.useCallback[scrollPrev]"], [
        ITEM_WIDTH
    ]);
    // --- Auto-Run Logic (Scrolls every 3 seconds) ---
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "CategoryCarousel.useEffect": ()=>{
            // Only run the interval if the data is present
            if (categoriesData.length === 0) return;
            const intervalId = setInterval(scrollNext, 3000); // Scroll every 3 seconds
            // Cleanup function to clear the interval when the component unmounts
            return ({
                "CategoryCarousel.useEffect": ()=>clearInterval(intervalId)
            })["CategoryCarousel.useEffect"];
        }
    }["CategoryCarousel.useEffect"], [
        scrollNext
    ]);
    // --- Infinite Wrap Logic (The key to seamless looping) ---
    const handleScroll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "CategoryCarousel.useCallback[handleScroll]": ()=>{
            if (!carouselRef.current) return;
            const { scrollLeft } = carouselRef.current;
            // Check if we have scrolled past the middle block (Block B -> Block C)
            // If scrollLeft is greater than or equal to the start of the third block (2 * TRANSITION_WIDTH)
            if (scrollLeft >= 2 * TRANSITION_WIDTH) {
                // Jump instantly back to the beginning of the middle block (Block B)
                carouselRef.current.scrollLeft = TRANSITION_WIDTH;
            } else if (scrollLeft < TRANSITION_WIDTH - ITEM_WIDTH) {
                // Jump instantly to the equivalent position at the end of the middle block (Block B's last item)
                // This is necessary because `scrollBy` might overshoot the ideal wrap point when scrolling manually backwards.
                carouselRef.current.scrollLeft = 2 * TRANSITION_WIDTH - ITEM_WIDTH;
            }
        }
    }["CategoryCarousel.useCallback[handleScroll]"], [
        TRANSITION_WIDTH,
        ITEM_WIDTH
    ]);
    // Effect to set the initial scroll position to the start of the middle block (B)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "CategoryCarousel.useEffect": ()=>{
            if (carouselRef.current) {
                // Wait for the layout to render, then jump to the middle block
                setTimeout({
                    "CategoryCarousel.useEffect": ()=>{
                        if (carouselRef.current) {
                            carouselRef.current.scrollLeft = TRANSITION_WIDTH;
                        }
                    }
                }["CategoryCarousel.useEffect"], 0);
            }
        }
    }["CategoryCarousel.useEffect"], [
        TRANSITION_WIDTH
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto font-[inter]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: carouselRef,
                        // Attach the infinite wrap logic to the scroll event
                        onScroll: handleScroll,
                        // Using space-x-5 (20px gap) for clean calculation: 200px card + 20px gap = 220px ITEM_WIDTH
                        className: "flex space-x-5 overflow-x-scroll no-scrollbar py-2 scroll-smooth touch-pan-x",
                        children: categoriesToRender.map((category, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselItem, {
                                children: [
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-full h-[180px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: category.imageUrl,
                                                        alt: category.name,
                                                        fill: true,
                                                        className: "w-full h-full object-cover rounded-t-xl",
                                                        onError: (e)=>{
                                                            const target = e.target;
                                                            target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Error';
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 shadow-[inset_0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `py-3 px-2 text-center ${category.bgColorClass} rounded-b-xl border-t border-gray-100`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-gray-800 select-none",
                                                    children: category.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                                lineNumber: 204,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, `${category.id}-${index}`, true, {
                                fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                        onClick: scrollPrev,
                        className: "left-[-19]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4 text-gray-600",
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                points: "15 18 9 12 15 6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                        onClick: scrollNext,
                        className: "right-[-22]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4 text-gray-600",
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                points: "9 18 15 12 9 6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                                lineNumber: 245,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/shared/CategoryCarousel.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CategoryCarousel, "OYhcMTZXffIq4nFGCbwvniLxBpU=");
_c3 = CategoryCarousel;
const __TURBOPACK__default__export__ = CategoryCarousel;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CarouselItem");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "Button");
__turbopack_context__.k.register(_c3, "CategoryCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/reusable/Masonary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/gsap/ScrollTrigger.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
if ("TURBOPACK compile-time truthy", 1) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].registerPlugin(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"]);
}
const useMedia = (queries, values, defaultValue)=>{
    _s();
    const get = ()=>values[queries.findIndex((q)=>matchMedia(q).matches)] ?? defaultValue;
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(get);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMedia.useEffect": ()=>{
            const handler = {
                "useMedia.useEffect.handler": ()=>setValue(get)
            }["useMedia.useEffect.handler"];
            queries.forEach({
                "useMedia.useEffect": (q)=>matchMedia(q).addEventListener('change', handler)
            }["useMedia.useEffect"]);
            return ({
                "useMedia.useEffect": ()=>queries.forEach({
                        "useMedia.useEffect": (q)=>matchMedia(q).removeEventListener('change', handler)
                    }["useMedia.useEffect"])
            })["useMedia.useEffect"];
        }
    }["useMedia.useEffect"], [
        queries
    ]);
    return value;
};
_s(useMedia, "4cCov9cipuUFrtyheqn9gyzPGSg=");
const useMeasure = ()=>{
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "useMeasure.useLayoutEffect": ()=>{
            if (!ref.current) return;
            const ro = new ResizeObserver({
                "useMeasure.useLayoutEffect": ([entry])=>{
                    const { width, height } = entry.contentRect;
                    setSize({
                        width,
                        height
                    });
                }
            }["useMeasure.useLayoutEffect"]);
            ro.observe(ref.current);
            return ({
                "useMeasure.useLayoutEffect": ()=>ro.disconnect()
            })["useMeasure.useLayoutEffect"];
        }
    }["useMeasure.useLayoutEffect"], []);
    return [
        ref,
        size
    ];
};
_s1(useMeasure, "GYjbSTsQ0vDlpjZVEQNK26QY9GU=");
const preloadImages = async (urls)=>{
    await Promise.all(urls.map((src)=>new Promise((resolve)=>{
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = ()=>resolve();
        })));
};
const Masonry = ({ items, ease = 'power3.out', duration = 0.6, stagger = 0.05, animateFrom = 'bottom', scaleOnHover = true, hoverScale = 1.02, blurToFocus = true, colorShiftOnHover = false, enableScrollAnimation = true, scrollAnimationType = 'mixed' })=>{
    _s2();
    const columns = useMedia([
        '(min-width:1500px)',
        '(min-width:1000px)',
        '(min-width:600px)'
    ], [
        3,
        2,
        1
    ], 1);
    const [containerRef, { width }] = useMeasure();
    const [imagesReady, setImagesReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollTriggersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Masonry.useEffect": ()=>{
            preloadImages(items.map({
                "Masonry.useEffect": (i)=>i.img
            }["Masonry.useEffect"])).then({
                "Masonry.useEffect": ()=>setImagesReady(true)
            }["Masonry.useEffect"]);
        }
    }["Masonry.useEffect"], [
        items
    ]);
    const grid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Masonry.useMemo[grid]": ()=>{
            if (!width) return [];
            const colHeights = new Array(columns).fill(0);
            const gap = 20;
            const totalGaps = (columns - 1) * gap;
            const columnWidth = (width - totalGaps) / columns;
            return items.map({
                "Masonry.useMemo[grid]": (child)=>{
                    const col = colHeights.indexOf(Math.min(...colHeights));
                    const x = col * (columnWidth + gap);
                    const height = child.height * columnWidth / 400;
                    const y = colHeights[col];
                    colHeights[col] += height + gap;
                    return {
                        ...child,
                        x,
                        y,
                        w: columnWidth,
                        h: height
                    };
                }
            }["Masonry.useMemo[grid]"]);
        }
    }["Masonry.useMemo[grid]"], [
        columns,
        items,
        width
    ]);
    // ⭐ NEW — FIX FOR SMALL SCREEN HEIGHT COLLAPSE
    const totalHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Masonry.useMemo[totalHeight]": ()=>{
            if (!grid.length) return 0;
            return Math.max(...grid.map({
                "Masonry.useMemo[totalHeight]": (item)=>item.y + item.h
            }["Masonry.useMemo[totalHeight]"]));
        }
    }["Masonry.useMemo[totalHeight]"], [
        grid
    ]);
    const hasMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "Masonry.useLayoutEffect": ()=>{
            if (!imagesReady) return;
            scrollTriggersRef.current.forEach({
                "Masonry.useLayoutEffect": (trigger)=>trigger.kill()
            }["Masonry.useLayoutEffect"]);
            scrollTriggersRef.current = [];
            grid.forEach({
                "Masonry.useLayoutEffect": (item, index)=>{
                    const selector = `[data-key="${item.id}"]`;
                    const element = document.querySelector(selector);
                    if (!element) return;
                    const animProps = {
                        x: item.x,
                        y: item.y,
                        width: item.w,
                        height: item.h
                    };
                    // Initial animation
                    if (!hasMounted.current) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(selector, {
                            opacity: 0,
                            x: item.x,
                            y: item.y + 100,
                            width: item.w,
                            height: item.h,
                            scale: 0.8,
                            ...blurToFocus && {
                                filter: 'blur(10px)'
                            }
                        }, {
                            opacity: 1,
                            scale: 1,
                            ...animProps,
                            ...blurToFocus && {
                                filter: 'blur(0px)'
                            },
                            duration: 0.8,
                            ease: 'power3.out',
                            delay: index * stagger
                        });
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(selector, {
                            ...animProps,
                            duration,
                            ease,
                            overwrite: 'auto'
                        });
                    }
                    // Scroll animations (only after mount)
                    if (enableScrollAnimation && hasMounted.current) {
                        const trigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$ScrollTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollTrigger"].create({
                            trigger: selector,
                            start: 'top bottom-=100',
                            end: 'bottom top+=100',
                            toggleActions: 'play none none reverse',
                            onEnter: {
                                "Masonry.useLayoutEffect.trigger": ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(selector, {
                                        opacity: 0,
                                        y: item.y + 50
                                    }, {
                                        opacity: 1,
                                        y: item.y,
                                        duration: 0.8,
                                        ease: 'power3.out'
                                    });
                                }
                            }["Masonry.useLayoutEffect.trigger"],
                            onLeaveBack: {
                                "Masonry.useLayoutEffect.trigger": ()=>{
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(selector, {
                                        opacity: 0,
                                        y: item.y + 50,
                                        duration: 0.5,
                                        ease: 'power2.in'
                                    });
                                }
                            }["Masonry.useLayoutEffect.trigger"]
                        });
                        scrollTriggersRef.current.push(trigger);
                    }
                }
            }["Masonry.useLayoutEffect"]);
            hasMounted.current = true;
            return ({
                "Masonry.useLayoutEffect": ()=>{
                    scrollTriggersRef.current.forEach({
                        "Masonry.useLayoutEffect": (trigger)=>trigger.kill()
                    }["Masonry.useLayoutEffect"]);
                    scrollTriggersRef.current = [];
                }
            })["Masonry.useLayoutEffect"];
        }
    }["Masonry.useLayoutEffect"], [
        grid,
        imagesReady,
        stagger,
        animateFrom,
        blurToFocus,
        duration,
        ease,
        enableScrollAnimation,
        scrollAnimationType
    ]);
    const handleMouseEnter = (id, element)=>{
        if (scaleOnHover) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(`[data-key="${id}"]`, {
                scale: hoverScale,
                duration: 0.4,
                ease: 'power2.out',
                zIndex: 10
            });
        }
        const textOverlay = element.querySelector('.text-overlay');
        if (textOverlay) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(textOverlay, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };
    const handleMouseLeave = (id, element)=>{
        if (scaleOnHover) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(`[data-key="${id}"]`, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out',
                zIndex: 1
            });
        }
    };
    const getTagColor = (tag)=>{
        switch(tag){
            case 'Wedding':
                return 'bg-gradient-to-r from-orange-500 to-pink-500';
            case 'Corporate':
                return 'bg-gradient-to-r from-orange-600 to-red-500';
            case 'Birthday':
                return 'bg-gradient-to-r from-orange-500 to-yellow-500';
            case 'Concert':
                return 'bg-gradient-to-r from-orange-500 to-purple-500';
            case 'Party':
                return 'bg-gradient-to-r from-orange-600 to-pink-600';
            default:
                return 'bg-gradient-to-r from-orange-500 to-red-500';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative w-full",
        style: {
            height: totalHeight
        },
        children: grid.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-key": item.id,
                className: "absolute box-content cursor-pointer",
                style: {
                    willChange: 'transform, width, height, opacity',
                    zIndex: 1
                },
                onClick: ()=>window.open(item.url, '_blank', 'noopener'),
                onMouseEnter: (e)=>handleMouseEnter(item.id, e.currentTarget),
                onMouseLeave: (e)=>handleMouseLeave(item.id, e.currentTarget),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-full bg-cover bg-center rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl",
                    style: {
                        backgroundImage: `url(${item.img})`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                        }, void 0, false, {
                            fileName: "[project]/src/components/reusable/Masonary.tsx",
                            lineNumber: 315,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        item.tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 left-4 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `px-3 py-1.5 rounded-full text-xs font-semibold text-white ${getTagColor(item.tag)}`,
                                children: item.tag
                            }, void 0, false, {
                                fileName: "[project]/src/components/reusable/Masonary.tsx",
                                lineNumber: 319,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/reusable/Masonary.tsx",
                            lineNumber: 318,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        (item.title || item.author) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-overlay absolute bottom-0 left-0 right-0 p-5 text-white opacity-90",
                            children: [
                                item.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-1.5 leading-tight",
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/reusable/Masonary.tsx",
                                    lineNumber: 332,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                item.author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-light opacity-90",
                                    children: item.author
                                }, void 0, false, {
                                    fileName: "[project]/src/components/reusable/Masonary.tsx",
                                    lineNumber: 337,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/reusable/Masonary.tsx",
                            lineNumber: 330,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/reusable/Masonary.tsx",
                    lineNumber: 311,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, item.id, false, {
                fileName: "[project]/src/components/reusable/Masonary.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/reusable/Masonary.tsx",
        lineNumber: 293,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(Masonry, "2KHhqudR5ZymYYQ+fLDJakVdxSw=", false, function() {
    return [
        useMedia,
        useMeasure
    ];
});
_c = Masonry;
const __TURBOPACK__default__export__ = Masonry;
var _c;
__turbopack_context__.k.register(_c, "Masonry");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_b00ce6ae._.js.map