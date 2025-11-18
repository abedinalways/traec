(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
]);

//# sourceMappingURL=src_components_shared_CategoryCarousel_tsx_bd551554._.js.map