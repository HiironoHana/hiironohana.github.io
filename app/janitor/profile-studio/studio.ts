export type LayoutMode = "left" | "right" | "stack";
export type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "none";
export type ClipShape = "none" | "circle" | "diamond" | "hexagon";
export type CharacterSection = "tabs" | "count" | "filters" | "cards";
export type ProfileSection = "identity" | "about" | "follow";
export type MotionStyle = "none" | "float" | "pulse" | "glow" | "slide";
export type ElementOffset = { x: number; y: number; width?: number; height?: number };
export type EditorTarget = { id: string; label: string; selector: string; panel: "canvas" | "layout" | "content" | "profile" | "type" | "cards" | "controls" | "images" | "widgets" | "code" | "support" | "explorer" | "safety"; kind: "layout" | "element"; repeated?: boolean };

export type StudioConfig = {
  pageColor: string; pageImage: string; pageSize: "cover" | "contain" | "auto"; pagePosition: string;
  pageRepeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y"; pageAttachment: "scroll" | "fixed"; pageBlend: string;
  pageBlur: number; pageBrightness: number; pageContrast: number; pageSaturate: number;
  overlayColor: string; overlayOpacity: number; overlayImage: string; overlayImageOpacity: number; vignette: number;
  maxWidth: number; layout: LayoutMode; layoutGap: number; profileWidth: number; profileSticky: boolean;
  profileOffsetX: number; profileOffsetY: number; cardsOffsetX: number; cardsOffsetY: number;
  elementOffsets: Record<string, ElementOffset>;
  characterOrder: CharacterSection[]; profileOrder: ProfileSection[];
  profileColor: string; profileGradientTo: string; profileGradient: boolean; profileImage: string; profilePadding: number;
  profileRadius: number; profileBorderWidth: number; profileBorderStyle: BorderStyle; profileBorderColor: string;
  profileShadow: number; profileGlow: number; profileGlass: number; profileOpacity: number; profileMinHeight: number;
  profileAlign: "left" | "center" | "right"; profileAnimation: "none" | "float" | "breathe";
  avatarSize: number; avatarRadius: number; avatarBorderWidth: number; avatarBorderColor: string; avatarGlow: number;
  avatarFilter: string; avatarHoverRestore: boolean; avatarClip: ClipShape; avatarRotate: number; avatarHoverScale: number;
  titleColor: string; titleFont: string; titleSize: number; titleWeight: number; titleItalic: boolean;
  titleCaps: boolean; titleSpacing: number; titleGlow: number; titleTransform: "none" | "uppercase" | "lowercase";
  bodyColor: string; mutedColor: string; linkColor: string; linkHoverColor: string; bodyFont: string; bodySize: number; bodyGlow: number; bodyLineHeight: number;
  cardColor: string; cardGradientTo: string; cardGradient: boolean; cardImage: string; cardWidth: number; cardMinHeight: number;
  cardRadius: number; cardBorderWidth: number; cardBorderStyle: BorderStyle; cardBorderColor: string;
  cardShadow: number; cardHoverLift: number; cardHoverGlow: number; cardHoverScale: number; cardOpacity: number;
  cardGap: number; cardJustify: "flex-start" | "center" | "space-between"; cardAnimation: "none" | "fade" | "rise";
  botImageHeight: number; botImageFilter: string; botImageHoverRestore: boolean; botImageMask: boolean; botImageClip: ClipShape;
  botImagePosition: string; botImageZoom: number;
  cardNameColor: string; creatorColor: string; descriptionColor: string; tokenColor: string; descriptionSize: number; descriptionAlign: "left" | "center" | "right";
  tagColor: string; tagTextColor: string; tagBorderColor: string; tagRadius: number; tagSize: number; tagGap: number;
  ribbonColor: string; starFilter: string; hideStar: boolean; hideTokens: boolean; hideTags: boolean; hideCreator: boolean; hideDescription: boolean; hideRibbon: boolean;
  headerColor: string; headerGradientTo: string; headerGradient: boolean; headerTextColor: string; headerBorderColor: string;
  headerHeight: number; headerBlur: number; headerLogoColor: string; headerSearchColor: string; headerSearchTextColor: string; headerCreateColor: string; headerIconColor: string; headerRadius: number; headerAnimation: MotionStyle; hideHeader: boolean;
  tabColor: string; tabTextColor: string; tabActiveColor: string; tabRadius: number; tabGlow: number; tabAnimation: MotionStyle;
  searchColor: string; searchTextColor: string; searchBorderColor: string; searchRadius: number; searchWidth: number; searchAnimation: MotionStyle;
  controlColor: string; controlTextColor: string; controlBorderColor: string; controlRadius: number; controlGlow: number;
  followLabel: string; hideFollowers: boolean; hideMemberSince: boolean; hideSearch: boolean; hideAbout: boolean;
  footerColor: string; footerTextColor: string; footerBorderColor: string; footerHeight: number; footerAlign: "left" | "center" | "space-between"; footerAnimation: MotionStyle; hideFooter: boolean;
  breakpoint: number; mobileCardWidth: number; mobilePadding: number; hideOverlayMobile: boolean;
  imageFilterAll: string; imageHoverRestoreAll: boolean; selectionColor: string; scrollbarColor: string;
  customCss: string;
};

export type LinkButton = { id: number; label: string; url: string };
export type ImageButton = { id: number; image: string; url: string; alt: string; width: number };
export type PageDoll = { id: number; image: string; alt: string; width: number; side: "left" | "right"; bottom: number; hideMobile: boolean };
export type DetailBlock = { id: number; summary: string; content: string; open: boolean };
export type ImageAsset = { id: number; name: string; url: string; source: "ella-approved" | "ella" | "external" };
export type HostedExperience = { id: number; title: string; description: string; url: string; kind: "game" | "tool" | "social"; label: string };
export type ExplorerItem = { id: number; name: string; kind: "text" | "image" | "box" | "button" | "badge" | "divider"; content: string; url: string; x: number; y: number; width: number; height: number; color: string; background: string; fontSize: number; radius: number; animation: MotionStyle; rotation: number; opacity: number; zIndex: number; hidden: boolean; locked: boolean };
export type Widgets = { links: LinkButton[]; imageButtons: ImageButton[]; dolls: PageDoll[]; details: DetailBlock[]; assets: ImageAsset[]; experiences: HostedExperience[]; layers: ExplorerItem[] };
export type Diagnostic = { level: "error" | "warning" | "info"; message: string };
export type PreviewProfileData = { username: string; followers: string; avatarUrl: string };
export type PreviewBotData = { id: number; name: string; description: string; chats: string; tokens: string; image: string; tags: string[] };

export const defaults: StudioConfig = {
  pageColor: "#303136", pageImage: "", pageSize: "cover", pagePosition: "center center", pageRepeat: "no-repeat", pageAttachment: "fixed", pageBlend: "normal",
  pageBlur: 0, pageBrightness: 100, pageContrast: 100, pageSaturate: 100,
  overlayColor: "#000000", overlayOpacity: 12, overlayImage: "", overlayImageOpacity: 20, vignette: 28,
  maxWidth: 1740, layout: "left", layoutGap: 30, profileWidth: 540, profileSticky: false,
  profileOffsetX: 0, profileOffsetY: 0, cardsOffsetX: 0, cardsOffsetY: 0,
  elementOffsets: {},
  characterOrder: ["tabs","count","filters","cards"], profileOrder: ["identity","about","follow"],
  profileColor: "#292a2f", profileGradientTo: "#202126", profileGradient: false, profileImage: "", profilePadding: 12,
  profileRadius: 8, profileBorderWidth: 1, profileBorderStyle: "solid", profileBorderColor: "#696a72",
  profileShadow: 28, profileGlow: 0, profileGlass: 0, profileOpacity: 100, profileMinHeight: 0, profileAlign: "left", profileAnimation: "none",
  avatarSize: 150, avatarRadius: 4, avatarBorderWidth: 1, avatarBorderColor: "#d9d9df", avatarGlow: 0,
  avatarFilter: "none", avatarHoverRestore: false, avatarClip: "none", avatarRotate: 0, avatarHoverScale: 100,
  titleColor: "#f3f3f5", titleFont: "Georgia", titleSize: 28, titleWeight: 700, titleItalic: false,
  titleCaps: false, titleSpacing: 0, titleGlow: 0, titleTransform: "none",
  bodyColor: "#f3f3f5", mutedColor: "#b7b7bf", linkColor: "#b69cff", linkHoverColor: "#ffffff", bodyFont: "Arial", bodySize: 14, bodyGlow: 0, bodyLineHeight: 150,
  cardColor: "#1d1e24", cardGradientTo: "#251d2e", cardGradient: false, cardImage: "", cardWidth: 190, cardMinHeight: 510,
  cardRadius: 8, cardBorderWidth: 1, cardBorderStyle: "solid", cardBorderColor: "#7560a0",
  cardShadow: 20, cardHoverLift: 4, cardHoverGlow: 18, cardHoverScale: 100, cardOpacity: 100, cardGap: 14, cardJustify: "flex-start", cardAnimation: "none",
  botImageHeight: 185, botImageFilter: "none", botImageHoverRestore: false, botImageMask: false, botImageClip: "none", botImagePosition: "center center", botImageZoom: 100,
  cardNameColor: "#f0eaf5", creatorColor: "#b69cff", descriptionColor: "#d0c5cf", tokenColor: "#a9a3ad", descriptionSize: 11, descriptionAlign: "center",
  tagColor: "#251d30", tagTextColor: "#eee8f4", tagBorderColor: "#77649e", tagRadius: 6, tagSize: 10, tagGap: 5,
  ribbonColor: "#8f25d2", starFilter: "none", hideStar: false, hideTokens: false, hideTags: false, hideCreator: false, hideDescription: false, hideRibbon: false,
  headerColor: "#38393f", headerGradientTo: "#303136", headerGradient: false, headerTextColor: "#eeeeef", headerBorderColor: "#55565d",
  headerHeight: 64, headerBlur: 0, headerLogoColor: "#f78af0", headerSearchColor: "#4b4c53", headerSearchTextColor: "#bebec4", headerCreateColor: "#34353b", headerIconColor: "#494a50", headerRadius: 0, headerAnimation: "none", hideHeader: false,
  tabColor: "#15161b", tabTextColor: "#30dce3", tabActiveColor: "#30dce3", tabRadius: 0, tabGlow: 0, tabAnimation: "none",
  searchColor: "#24252a", searchTextColor: "#eeeeef", searchBorderColor: "#65666d", searchRadius: 8, searchWidth: 230, searchAnimation: "none",
  controlColor: "#24252a", controlTextColor: "#eeeeef", controlBorderColor: "#65666d", controlRadius: 8, controlGlow: 0,
  followLabel: "Follow", hideFollowers: false, hideMemberSince: false, hideSearch: false, hideAbout: false,
  footerColor: "#17171a", footerTextColor: "#aaa5ad", footerBorderColor: "#333138", footerHeight: 50, footerAlign: "space-between", footerAnimation: "none", hideFooter: false,
  breakpoint: 700, mobileCardWidth: 190, mobilePadding: 12, hideOverlayMobile: true,
  imageFilterAll: "none", imageHoverRestoreAll: false, selectionColor: "#d763dd", scrollbarColor: "#d763dd",
  customCss: "",
};

export const emptyWidgets: Widgets = { links: [], imageButtons: [], dolls: [], details: [], assets: [], experiences: [], layers: [] };
export const defaultPreviewProfile: PreviewProfileData = { username: "ExampleCreator", followers: "128", avatarUrl: "" };
export const defaultPreviewBots: PreviewBotData[] = [{
  id: 1,
  name: "The Test Bot",
  description: "A completely local test card. Change the name, image, description, stats, and tags without touching your exported profile source.",
  chats: "42",
  tokens: "1.2k tokens",
  image: "",
  tags: ["Limitless", "Test Bot", "#custom-tag"],
}];

export const editableTargets: EditorTarget[] = [
  {id:"page",label:"Page background",selector:".pp-page-background, .profile-page-background",panel:"canvas",kind:"layout"},
  {id:"page-content",label:"Page content",selector:".profile-page-container",panel:"layout",kind:"layout"},
  {id:"columns",label:"Profile and character columns",selector:".profile-page-flex",panel:"layout",kind:"layout"},
  {id:"header",label:"Top bar",selector:".pp-top-bar:not(.pp-top-bar-inner), .profile-top-bar-flex-outer, .pp-top-bar-outer",panel:"controls",kind:"layout"},
  {id:"profile",label:"Profile panel",selector:".pp-uc-background, .profile-uc-background-flex, .profile-uc-background",panel:"profile",kind:"layout"},
  {id:"profile-content",label:"Profile content",selector:".profile-info-wrapper-box",panel:"profile",kind:"layout"},
  {id:"identity-row",label:"Avatar and identity row",selector:".profile-info-hstack",panel:"profile",kind:"layout"},
  {id:"character-area",label:"Character area",selector:".profile-page-container-flex-box",panel:"layout",kind:"layout"},
  {id:"tab-system",label:"Complete tab system",selector:".profile-tabs-chakra-tabs",panel:"controls",kind:"layout"},
  {id:"tabs",label:"Character tabs",selector:".pp-tabs-wrapper, .profile-tabs-wrapper",panel:"controls",kind:"layout"},
  {id:"results-row",label:"Count and search row",selector:".character-list-pagination-flex",panel:"layout",kind:"layout"},
  {id:"count",label:"Character count",selector:".pp-pg-total, .profile-badge-flex-outer",panel:"layout",kind:"layout"},
  {id:"filters",label:"Search and filters",selector:".profile-filters-flex-outer",panel:"controls",kind:"layout"},
  {id:"cards",label:"Bot-card area",selector:".pp-cc-list-container",panel:"cards",kind:"layout"},
  {id:"pagination",label:"Character pagination",selector:".characters-list-container-flex > .profile-pagination-flex-outer",panel:"layout",kind:"layout"},
  {id:"footer",label:"Bottom bar",selector:".pp-mnb-wrapper, .pp-footer, footer",panel:"controls",kind:"layout"},
  {id:"header-left",label:"Top-bar left group",selector:".pp-top-bar-left",panel:"controls",kind:"element"},
  {id:"logo",label:"Janitor logo",selector:".pp-top-bar-logo, .profile-top-bar-logo-box",panel:"controls",kind:"element"},
  {id:"logo-name",label:"Janitor logo word",selector:".profile-top-bar-logo-name",panel:"controls",kind:"element"},
  {id:"logo-beta",label:"Janitor beta label",selector:".profile-top-bar-logo-sub-name",panel:"controls",kind:"element"},
  {id:"top-search",label:"Top search bar",selector:".profile-top-bar-search-wrapper",panel:"controls",kind:"element"},
  {id:"create",label:"Create Character button",selector:".profile-top-bar-create-char",panel:"controls",kind:"element"},
  {id:"header-right",label:"Top-bar right group",selector:".pp-top-bar-right",panel:"controls",kind:"element"},
  {id:"top-icons",label:"All top-bar icons",selector:"[aria-label=\"Notifications\"], .pp-top-bar-app-menu, .pp-top-bar-right .top-icon",panel:"controls",kind:"element",repeated:true},
  {id:"avatar-box",label:"Avatar container",selector:".profile-avatar-container",panel:"profile",kind:"element"},
  {id:"avatar",label:"Profile avatar",selector:".profile-avatar",panel:"profile",kind:"element"},
  {id:"identity",label:"Profile identity",selector:".profile-info-stack-inner",panel:"profile",kind:"element"},
  {id:"title",label:"Profile name",selector:".profile-title-heading",panel:"type",kind:"element"},
  {id:"followers",label:"Follower count",selector:".profile-followers-count",panel:"type",kind:"element"},
  {id:"member",label:"Member line",selector:".profile-member-since-box",panel:"type",kind:"element"},
  {id:"about",label:"About Me",selector:".profile-about-me",panel:"widgets",kind:"element"},
  {id:"follow",label:"Follow / options row",selector:".profile-uc-follow-flex",panel:"controls",kind:"element"},
  {id:"tab-button",label:"All character-tab buttons",selector:".profile-tabs-button",panel:"controls",kind:"element",repeated:true},
  {id:"tab-indicator",label:"Character tab indicator",selector:".profile-tabs-indicator",panel:"controls",kind:"element"},
  {id:"character-search",label:"Character search box",selector:".profile-character-search-input-group",panel:"controls",kind:"element"},
  {id:"character-search-input",label:"Character search input",selector:".profile-character-search-input",panel:"controls",kind:"element"},
  {id:"filter-button",label:"Filter button",selector:".profile-filter-button",panel:"controls",kind:"element"},
  {id:"sort",label:"Sort control",selector:".profile-filters-flex-inner-onorderchanged",panel:"controls",kind:"element"},
  {id:"card",label:"All bot cards",selector:".pp-cc-wrapper, .profile-character-card-wrapper",panel:"cards",kind:"element",repeated:true},
  {id:"card-content",label:"All bot-card contents",selector:".profile-character-card-stack",panel:"cards",kind:"element",repeated:true},
  {id:"card-name",label:"All bot names",selector:".profile-character-card-name-box",panel:"cards",kind:"element",repeated:true},
  {id:"card-art",label:"All bot artwork",selector:".profile-character-card-avatar-image",panel:"cards",kind:"element",repeated:true},
  {id:"ribbon",label:"All chat-ribbon containers",selector:".pp-cc-ribbon, .profile-character-card-ribbon",panel:"cards",kind:"element",repeated:true},
  {id:"ribbon-content",label:"All chat-ribbon labels",selector:".pp-cc-ribbon-wrap, .profile-character-card-ribbon-wrap, .profile-character-card-ribbon > .pp-cc-chats-count",panel:"cards",kind:"element",repeated:true},
  {id:"creator",label:"All creator names",selector:".profile-character-card-creator-name-box",panel:"cards",kind:"element",repeated:true},
  {id:"description",label:"All bot descriptions",selector:".profile-character-card-description-box",panel:"cards",kind:"element",repeated:true},
  {id:"star",label:"All card stars",selector:".profile-character-card-star-line",panel:"cards",kind:"element",repeated:true},
  {id:"tags",label:"All bot-tag rows",selector:".profile-character-card-tags",panel:"cards",kind:"element",repeated:true},
  {id:"tag",label:"All individual bot tags",selector:".profile-character-card-tags-item",panel:"cards",kind:"element",repeated:true},
  {id:"tokens",label:"All token counts",selector:".profile-character-card-tokens-count",panel:"cards",kind:"element",repeated:true},
  {id:"footer-copy",label:"Bottom-bar content",selector:".pp-mnb-container, .pp-footer > span:first-child, footer > :first-child",panel:"controls",kind:"element"},
  {id:"footer-links",label:"Footer links",selector:".footer-links, footer nav, footer > :last-child",panel:"controls",kind:"element"},
];

export const presets: Record<string, Partial<StudioConfig>> = {
  Janitor: {},
  Scarlet: { pageColor:"#080305", profileColor:"#3b0b14", profileGradientTo:"#090305", profileGradient:true, cardColor:"#0d0407", cardGradientTo:"#260711", cardGradient:true, titleColor:"#fff6f7", bodyColor:"#eee1e4", mutedColor:"#bba3a9", linkColor:"#ef7382", linkHoverColor:"#ffffff", profileBorderColor:"#b53246", cardBorderColor:"#a93244", headerColor:"#4b0a16", headerGradientTo:"#16040a", headerGradient:true, headerBorderColor:"#9b1a30", tabColor:"#300912", tabTextColor:"#f38b98", tabActiveColor:"#ff6d7e", controlColor:"#1b070c", controlBorderColor:"#9e3040", ribbonColor:"#a21d32", tagColor:"#270812", tagBorderColor:"#8d3040", avatarGlow:18, titleGlow:15, profileGlow:18, cardHoverGlow:28 },
  Velvet: { pageColor:"#120d17", profileColor:"#211429", profileGradientTo:"#100b14", profileGradient:true, cardColor:"#2c1935", cardGradientTo:"#160e1d", cardGradient:true, titleColor:"#fff4fb", bodyColor:"#f7eaf2", mutedColor:"#c9afc7", linkColor:"#ed8fc8", linkHoverColor:"#ffffff", profileBorderColor:"#7b416d", cardBorderColor:"#7b416d", headerColor:"#2b162b", headerGradientTo:"#140c17", headerGradient:true, tabTextColor:"#ed8fc8", tabActiveColor:"#ffb9e2", controlColor:"#28162c", controlBorderColor:"#754168", ribbonColor:"#a24b85", tagColor:"#321c38", tagBorderColor:"#754168", profileRadius:18, cardRadius:18, controlRadius:12, avatarRadius:50, profileGlass:8 },
  Frost: { pageColor:"#0d141c", profileColor:"#172637", profileGradientTo:"#0f1924", profileGradient:true, cardColor:"#172232", cardGradientTo:"#0d1621", cardGradient:true, titleColor:"#f2fbff", bodyColor:"#e8f6ff", mutedColor:"#9eb4c6", linkColor:"#62dbff", linkHoverColor:"#ffffff", profileBorderColor:"#315a72", cardBorderColor:"#315a72", headerColor:"#122333", headerGradientTo:"#0a1119", headerGradient:true, tabTextColor:"#62dbff", tabActiveColor:"#b7f2ff", controlColor:"#112231", controlBorderColor:"#315a72", ribbonColor:"#178bb5", tagColor:"#173044", tagBorderColor:"#39718e", avatarGlow:15, profileGlass:10 },
  Cyber: { pageColor:"#05060a", profileColor:"#0b1020", profileGradientTo:"#120b22", profileGradient:true, cardColor:"#090e1a", cardGradientTo:"#180d27", cardGradient:true, titleColor:"#e9fbff", bodyColor:"#d8f8ff", mutedColor:"#8293ad", linkColor:"#00f0ff", linkHoverColor:"#f500ff", profileBorderColor:"#00b8c7", cardBorderColor:"#9e22d8", headerColor:"#080b17", headerGradientTo:"#180925", headerGradient:true, tabTextColor:"#00f0ff", tabActiveColor:"#f500ff", controlColor:"#0a1020", controlBorderColor:"#7540a5", ribbonColor:"#d000ff", tagColor:"#11172b", tagBorderColor:"#00a7b4", titleGlow:22, profileGlow:18, cardHoverGlow:32, avatarClip:"hexagon" },
  Paper: { pageColor:"#e9e0d0", profileColor:"#fff8e9", profileGradientTo:"#ede1cb", profileGradient:true, cardColor:"#f8edda", cardGradientTo:"#e8d8bd", cardGradient:true, titleColor:"#2e261e", bodyColor:"#302820", mutedColor:"#766757", linkColor:"#a43f35", linkHoverColor:"#6f251e", profileBorderColor:"#aa9274", cardBorderColor:"#aa9274", headerColor:"#3b3027", headerGradientTo:"#211a15", headerGradient:true, headerTextColor:"#fff8ec", tabColor:"#3b3027", tabTextColor:"#f4d3a4", tabActiveColor:"#ffffff", controlColor:"#fff8e9", controlTextColor:"#2e261e", controlBorderColor:"#aa9274", ribbonColor:"#8e392e", tagColor:"#e7d6ba", tagTextColor:"#382d23", tagBorderColor:"#aa9274", profileRadius:2, cardRadius:2, controlRadius:2, titleFont:"Georgia", bodyFont:"Georgia" },
  "Midnight Glass": { pageColor:"#070a12", profileColor:"#101729", profileGradientTo:"#090c16", profileGradient:true, profileOpacity:86, profileGlass:18, cardColor:"#0d1322", cardGradientTo:"#11182b", cardGradient:true, cardOpacity:90, titleColor:"#f7f9ff", bodyColor:"#e8edff", mutedColor:"#94a0bc", linkColor:"#8cb8ff", linkHoverColor:"#ffffff", profileBorderColor:"#5476a5", cardBorderColor:"#3b5479", headerColor:"#090e1c", headerGradientTo:"#151b2c", headerGradient:true, headerBlur:16, tabColor:"#0c1322", tabTextColor:"#8cb8ff", tabActiveColor:"#d7e5ff", controlColor:"#111a2d", controlBorderColor:"#4f6d99", profileRadius:24, cardRadius:18, controlRadius:12, profileGlow:14, cardHoverGlow:25 },
  "CRT Arcade": { pageColor:"#030805", profileColor:"#07120b", profileGradientTo:"#030805", profileGradient:true, cardColor:"#061109", cardGradientTo:"#020704", cardGradient:true, titleColor:"#d9ffb8", bodyColor:"#c8ffaf", mutedColor:"#70a66b", linkColor:"#79ff76", linkHoverColor:"#f6ff8c", profileBorderColor:"#2cda58", cardBorderColor:"#2cda58", headerColor:"#041108", headerGradientTo:"#010503", headerGradient:true, headerLogoColor:"#79ff76", tabColor:"#020a04", tabTextColor:"#79ff76", tabActiveColor:"#f6ff8c", controlColor:"#07140a", controlTextColor:"#d9ffb8", controlBorderColor:"#2cda58", ribbonColor:"#1a9f43", tagColor:"#09210f", tagBorderColor:"#2cda58", titleFont:"Courier New", bodyFont:"Courier New", titleGlow:20, bodyGlow:8, tabGlow:14, cardHoverGlow:22, cardRadius:0, profileRadius:0, controlRadius:0 },
  "Soft Floral": { pageColor:"#f5e8ef", profileColor:"#fff7fb", profileGradientTo:"#efdce7", profileGradient:true, cardColor:"#fff9fc", cardGradientTo:"#eddce7", cardGradient:true, titleColor:"#5b3048", bodyColor:"#513947", mutedColor:"#947286", linkColor:"#bd4d82", linkHoverColor:"#77304f", profileBorderColor:"#d69ab8", cardBorderColor:"#d69ab8", headerColor:"#723e5a", headerGradientTo:"#4e2a3e", headerGradient:true, headerTextColor:"#fff7fb", headerLogoColor:"#ffd5e8", tabColor:"#fff7fb", tabTextColor:"#a83f70", tabActiveColor:"#d75991", controlColor:"#fff7fb", controlTextColor:"#5b3048", controlBorderColor:"#d69ab8", ribbonColor:"#c94e82", tagColor:"#f2d9e6", tagTextColor:"#62364c", tagBorderColor:"#d69ab8", avatarRadius:50, profileRadius:30, cardRadius:24, controlRadius:18, cardHoverLift:8 },
  "Dark Academia": { pageColor:"#15110d", profileColor:"#2a2119", profileGradientTo:"#15100c", profileGradient:true, cardColor:"#211a14", cardGradientTo:"#100c09", cardGradient:true, titleColor:"#f0dfbd", bodyColor:"#ddcbaa", mutedColor:"#9f8b6f", linkColor:"#d3a861", linkHoverColor:"#fff1cb", profileBorderColor:"#765c39", cardBorderColor:"#765c39", headerColor:"#22180f", headerGradientTo:"#0f0b08", headerGradient:true, headerLogoColor:"#d3a861", tabColor:"#1c140e", tabTextColor:"#d3a861", tabActiveColor:"#fff1cb", controlColor:"#2a2119", controlTextColor:"#f0dfbd", controlBorderColor:"#765c39", ribbonColor:"#765021", tagColor:"#352719", tagTextColor:"#ead8b3", tagBorderColor:"#765c39", titleFont:"Georgia", bodyFont:"Georgia", profileRadius:4, cardRadius:4, controlRadius:2, profileBorderStyle:"double", cardBorderStyle:"double", profileBorderWidth:3 },
  "Neon Metro": { pageColor:"#06060d", profileColor:"#121020", profileGradientTo:"#090711", profileGradient:true, cardColor:"#100d1b", cardGradientTo:"#07060c", cardGradient:true, titleColor:"#ffffff", bodyColor:"#e9e4ff", mutedColor:"#9d91b8", linkColor:"#ff4fa3", linkHoverColor:"#56f3ff", profileBorderColor:"#ff4fa3", cardBorderColor:"#754cff", headerColor:"#0a0813", headerGradientTo:"#191027", headerGradient:true, headerLogoColor:"#ff4fa3", tabColor:"#0a0813", tabTextColor:"#56f3ff", tabActiveColor:"#ff4fa3", controlColor:"#130f21", controlBorderColor:"#754cff", ribbonColor:"#ff2b8f", tagColor:"#19112a", tagBorderColor:"#754cff", titleGlow:18, profileGlow:20, tabGlow:18, cardHoverGlow:38, avatarClip:"diamond", headerAnimation:"glow", tabAnimation:"pulse" },
  "Reading Room": { pageColor:"#f1eee7", profileColor:"#fffdf7", profileGradientTo:"#eae4d8", profileGradient:true, cardColor:"#fffdf7", cardGradientTo:"#ebe5da", cardGradient:true, titleColor:"#25211b", bodyColor:"#322e27", mutedColor:"#766f63", linkColor:"#375f75", linkHoverColor:"#182f3b", profileBorderColor:"#b6aa96", cardBorderColor:"#b6aa96", headerColor:"#242a2c", headerGradientTo:"#15191b", headerGradient:true, headerTextColor:"#f8f4eb", headerLogoColor:"#c9e6f2", tabColor:"#fffdf7", tabTextColor:"#375f75", tabActiveColor:"#182f3b", controlColor:"#f8f4eb", controlTextColor:"#25211b", controlBorderColor:"#b6aa96", ribbonColor:"#375f75", tagColor:"#e9e2d6", tagTextColor:"#322e27", tagBorderColor:"#b6aa96", bodyFont:"Georgia", descriptionAlign:"left", bodyLineHeight:175, profileWidth:610, cardWidth:230, cardMinHeight:470, profileRadius:6, cardRadius:6, controlRadius:4 },
  "Minimal Studio": { pageColor:"#ededed", profileColor:"#ffffff", profileGradient:false, cardColor:"#ffffff", cardGradient:false, titleColor:"#111111", bodyColor:"#222222", mutedColor:"#6d6d6d", linkColor:"#2457ff", linkHoverColor:"#111111", profileBorderColor:"#bdbdbd", cardBorderColor:"#c8c8c8", headerColor:"#111111", headerGradient:false, headerTextColor:"#ffffff", headerLogoColor:"#ffffff", tabColor:"#ffffff", tabTextColor:"#111111", tabActiveColor:"#2457ff", controlColor:"#ffffff", controlTextColor:"#111111", controlBorderColor:"#bdbdbd", ribbonColor:"#2457ff", tagColor:"#f2f2f2", tagTextColor:"#222222", tagBorderColor:"#c8c8c8", profileRadius:0, cardRadius:0, controlRadius:0, profileShadow:8, cardShadow:8, cardHoverGlow:0, titleFont:"Arial", bodyFont:"Arial" },
};

export type StudioProject = {
  version: 10;
  config: StudioConfig;
  widgets: Widgets;
  previewProfile: PreviewProfileData;
  previewBots: PreviewBotData[];
  rawCss: string;
  manual: boolean;
  rawHtml: string;
  manualHtml: boolean;
};

const finite = (value:unknown, fallback:number) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
const oneOf = <T extends string>(value:unknown, allowed:readonly T[], fallback:T):T => typeof value === "string" && allowed.includes(value as T) ? value as T : fallback;
const normalizeOrder = <T extends string>(value:unknown, canonical:readonly T[]) => {
  const incoming = Array.isArray(value) ? value.filter((item):item is T => typeof item === "string" && canonical.includes(item as T)) : [];
  return [...new Set([...incoming,...canonical])] as T[];
};

export function migrateProject(input:unknown):StudioProject {
  const data = input && typeof input === "object" ? input as Record<string,unknown> : {};
  const incomingVersion = finite(data.version, 0);
  if(incomingVersion > 10) throw new Error("This project was made with a newer version of Patchies Studio.");
  const rawConfig = data.config && typeof data.config === "object" ? data.config as Partial<StudioConfig> : {};
  const frames:StudioConfig["elementOffsets"] = {};
  if(rawConfig.elementOffsets && typeof rawConfig.elementOffsets === "object") Object.entries(rawConfig.elementOffsets).forEach(([id,value])=>{
    if(!value || typeof value !== "object") return;
    const frame=value as ElementOffset;
    frames[id]={x:finite(frame.x,0),y:finite(frame.y,0),...(Number.isFinite(frame.width)?{width:Math.max(16,Number(frame.width))}:{}),...(Number.isFinite(frame.height)?{height:Math.max(12,Number(frame.height))}:{})};
  });
  if(!frames.profile && (finite(rawConfig.profileOffsetX,0)||finite(rawConfig.profileOffsetY,0))) frames.profile={x:finite(rawConfig.profileOffsetX,0),y:finite(rawConfig.profileOffsetY,0)};
  if(!frames.cards && (finite(rawConfig.cardsOffsetX,0)||finite(rawConfig.cardsOffsetY,0))) frames.cards={x:finite(rawConfig.cardsOffsetX,0),y:finite(rawConfig.cardsOffsetY,0)};
  const normalizedConfig={...defaults} as StudioConfig;
  const normalizedRecord=normalizedConfig as unknown as Record<string,unknown>, rawRecord=rawConfig as Record<string,unknown>;
  Object.entries(defaults as unknown as Record<string,unknown>).forEach(([key,fallback])=>{const candidate=rawRecord[key];if(typeof fallback==="number")normalizedRecord[key]=finite(candidate,fallback);else if(typeof fallback==="string")normalizedRecord[key]=typeof candidate==="string"?candidate:fallback;else if(typeof fallback==="boolean")normalizedRecord[key]=typeof candidate==="boolean"?candidate:fallback});
  const config:StudioConfig={
    ...normalizedConfig,
    pageSize:oneOf(rawConfig.pageSize,["cover","contain","auto"] as const,defaults.pageSize),
    pageRepeat:oneOf(rawConfig.pageRepeat,["no-repeat","repeat","repeat-x","repeat-y"] as const,defaults.pageRepeat),
    pageAttachment:oneOf(rawConfig.pageAttachment,["scroll","fixed"] as const,defaults.pageAttachment),
    layout:oneOf(rawConfig.layout,["left","right","stack"] as const,defaults.layout),
    profileBorderStyle:oneOf(rawConfig.profileBorderStyle,["solid","dashed","dotted","double","none"] as const,defaults.profileBorderStyle),
    profileAlign:oneOf(rawConfig.profileAlign,["left","center","right"] as const,defaults.profileAlign),
    profileAnimation:oneOf(rawConfig.profileAnimation,["none","float","breathe"] as const,defaults.profileAnimation),
    avatarClip:oneOf(rawConfig.avatarClip,["none","circle","diamond","hexagon"] as const,defaults.avatarClip),
    titleTransform:oneOf(rawConfig.titleTransform,["none","uppercase","lowercase"] as const,defaults.titleTransform),
    cardBorderStyle:oneOf(rawConfig.cardBorderStyle,["solid","dashed","dotted","double","none"] as const,defaults.cardBorderStyle),
    cardJustify:oneOf(rawConfig.cardJustify,["flex-start","center","space-between"] as const,defaults.cardJustify),
    cardAnimation:oneOf(rawConfig.cardAnimation,["none","fade","rise"] as const,defaults.cardAnimation),
    botImageClip:oneOf(rawConfig.botImageClip,["none","circle","diamond","hexagon"] as const,defaults.botImageClip),
    descriptionAlign:oneOf(rawConfig.descriptionAlign,["left","center","right"] as const,defaults.descriptionAlign),
    headerAnimation:oneOf(rawConfig.headerAnimation,["none","float","pulse","glow","slide"] as const,defaults.headerAnimation),
    tabAnimation:oneOf(rawConfig.tabAnimation,["none","float","pulse","glow","slide"] as const,defaults.tabAnimation),
    searchAnimation:oneOf(rawConfig.searchAnimation,["none","float","pulse","glow","slide"] as const,defaults.searchAnimation),
    footerAlign:oneOf(rawConfig.footerAlign,["left","center","space-between"] as const,defaults.footerAlign),
    footerAnimation:oneOf(rawConfig.footerAnimation,["none","float","pulse","glow","slide"] as const,defaults.footerAnimation),
    pageImage:"",overlayImage:"",profileImage:"",cardImage:"",
    profileOffsetX:0,profileOffsetY:0,cardsOffsetX:0,cardsOffsetY:0,
    elementOffsets:frames,
    characterOrder:normalizeOrder(rawConfig.characterOrder,["tabs","count","filters","cards"] as const),
    profileOrder:normalizeOrder(rawConfig.profileOrder,["identity","about","follow"] as const),
  };
  const rawWidgets=data.widgets && typeof data.widgets === "object" ? data.widgets as Partial<Widgets> : {};
  const records=(value:unknown)=>Array.isArray(value)?value.map(item=>item&&typeof item==="object"?item as Record<string,unknown>:{}):[];
  const string=(value:unknown,fallback="")=>typeof value==="string"?value:fallback;
  const links:LinkButton[]=records(rawWidgets.links).map((item,index)=>({id:Math.round(finite(item.id,index+1)),label:string(item.label,"Link"),url:string(item.url,"https://")}));
  const imageButtons:ImageButton[]=records(rawWidgets.imageButtons).map((item,index)=>({id:Math.round(finite(item.id,index+1)),image:string(item.image),url:string(item.url,"https://"),alt:string(item.alt,"Image button"),width:Math.max(1,finite(item.width,120))}));
  const dolls:PageDoll[]=records(rawWidgets.dolls).map((item,index)=>({id:Math.round(finite(item.id,index+1)),image:string(item.image),alt:string(item.alt,"Page doll"),width:Math.max(1,finite(item.width,160)),side:item.side==="left"?"left":"right",bottom:finite(item.bottom,20),hideMobile:typeof item.hideMobile==="boolean"?item.hideMobile:true}));
  const details:DetailBlock[]=records(rawWidgets.details).map((item,index)=>({id:Math.round(finite(item.id,index+1)),summary:string(item.summary,"Read more"),content:string(item.content),open:Boolean(item.open)}));
  const assets:ImageAsset[]=records(rawWidgets.assets).map((item,index)=>({id:Math.round(finite(item.id,index+1)),name:string(item.name,`Image ${index+1}`),url:string(item.url),source:item.source==="ella-approved"||item.source==="ella"?item.source:"external"}));
  const experiences:HostedExperience[]=records(rawWidgets.experiences).map((item,index)=>({id:Math.round(finite(item.id,index+1)),title:string(item.title,"Experience"),description:string(item.description),url:string(item.url,"https://"),kind:item.kind==="tool"||item.kind==="social"?item.kind:"game",label:string(item.label,"Launch")}));
  const usedIds=new Set<number>();
  const layers=(Array.isArray(rawWidgets.layers)?rawWidgets.layers:[]).map((value,index)=>{
    const layer=value && typeof value === "object" ? value as Partial<ExplorerItem> : {};
    let id=Math.max(1,Math.round(finite(layer.id,index+1)));
    while(usedIds.has(id))id+=1;usedIds.add(id);
    const allowedKinds:ExplorerItem["kind"][]=["text","image","box","button","badge","divider"];
    const kind=allowedKinds.includes(layer.kind as ExplorerItem["kind"])?layer.kind as ExplorerItem["kind"]:"text";
    return {id,name:typeof layer.name==="string"?layer.name:`Layer ${id}`,kind,content:typeof layer.content==="string"?layer.content:"",url:typeof layer.url==="string"?layer.url:"",x:finite(layer.x,0),y:finite(layer.y,0),width:Math.max(16,finite(layer.width,kind==="divider"?240:220)),height:Math.max(0,finite(layer.height,0)),color:typeof layer.color==="string"?layer.color:"#ffffff",background:typeof layer.background==="string"?layer.background:"#251d30",fontSize:Math.max(6,finite(layer.fontSize,16)),radius:Math.max(0,finite(layer.radius,8)),animation:["none","float","pulse","glow","slide"].includes(String(layer.animation))?layer.animation as MotionStyle:"none",rotation:finite(layer.rotation,0),opacity:Math.min(100,Math.max(0,finite(layer.opacity,100))),zIndex:Math.round(finite(layer.zIndex,5)),hidden:Boolean(layer.hidden),locked:Boolean(layer.locked)};
  });
  const widgets:Widgets={...emptyWidgets,links,imageButtons,dolls,details,assets,experiences,layers};
  const rawProfile=data.previewProfile && typeof data.previewProfile === "object" ? data.previewProfile as Partial<PreviewProfileData> : {};
  const bots=(Array.isArray(data.previewBots)?data.previewBots:defaultPreviewBots).map((bot,index)=>{const value=bot && typeof bot==="object"?bot as Partial<PreviewBotData>:{};return {id:Math.round(finite(value.id,index+1)),name:typeof value.name==="string"?value.name:"Test Bot",description:typeof value.description==="string"?value.description:"",chats:typeof value.chats==="string"?value.chats:"0",tokens:typeof value.tokens==="string"?value.tokens:"0 tokens",image:typeof value.image==="string"?value.image:"",tags:Array.isArray(value.tags)?value.tags.filter((tag):tag is string=>typeof tag==="string"):[]}});
  return {version:10,config,widgets,previewProfile:{username:string(rawProfile.username,defaultPreviewProfile.username),followers:string(rawProfile.followers,defaultPreviewProfile.followers),avatarUrl:string(rawProfile.avatarUrl,defaultPreviewProfile.avatarUrl)},previewBots:bots,rawCss:typeof data.rawCss==="string"?data.rawCss:"",manual:Boolean(data.manual),rawHtml:typeof data.rawHtml==="string"?data.rawHtml:"",manualHtml:Boolean(data.manualHtml)};
}

const safeUrl = (value: string) => value.replace(/["'\\\n\r<>]/g, "");
const safeText = (value: string) => value.replace(/["\\\n\r]/g, "");
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]!));
const rgba = (hex: string, percent: number) => {
  const value = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) return hex;
  const n = Number.parseInt(value, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${(percent / 100).toFixed(2)})`;
};
const background = (solid:string, to:string, gradient:boolean) => gradient ? `linear-gradient(145deg, ${solid}, ${to})` : solid;
const clip = (shape: ClipShape) => ({ none:"none", circle:"circle(50%)", diamond:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", hexagon:"polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)" }[shape]);
const shadow = (depth:number, glow:number, color:string) => `0 ${Math.max(2,Math.round(depth/3))}px ${depth}px rgba(0,0,0,0.58)${glow ? `, 0 0 ${glow}px ${rgba(color,45)}` : ""}`;

const STYLE_BLOCK_PATTERN=/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
const neutralizeStyleBoundary=(source:string)=>source.replace(/<\/style/gi,"<\\/style");

function cssBody(source:string){
  const trimmed=source.trim();
  const blocks=[...trimmed.matchAll(STYLE_BLOCK_PATTERN)];
  const body=blocks.length
    ? blocks.map(match=>match[1]).join("\n\n")
    : trimmed.replace(/^\s*<style[^>]*>\s*/i,"").replace(/\s*<\/style\s*>\s*$/i,"");
  // <style> is an HTML raw-text boundary. Escaping the slash preserves a
  // literal closing tag in CSS strings/comments without letting it become DOM.
  return neutralizeStyleBoundary(body);
}

export function ensureWrapped(source:string){ return `<style>\n${cssBody(source).trim()}\n</style>`; }
export function unwrap(source:string){ return cssBody(source); }

export type ImageAnalysis = { status: "good" | "warning" | "error" | "empty"; label: string; message: string; normalized: string; source: ImageAsset["source"] };
export function analyzeImageUrl(input:string):ImageAnalysis {
  let normalized=input.trim().replace(/^["']|["']$/g, "");
  if(!normalized) return {status:"empty",label:"No image yet",message:"Paste a public image URL to inspect it.",normalized:"",source:"external"};
  if(/^https:\/\/ella\.janitor\.ai\//i.test(normalized)) normalized=normalized.replace(/^https:\/\/ella\.janitor\.ai\//i,"https://ella.janitorai.com/");
  if(/^file:|^data:/i.test(normalized)) return {status:"error",label:"Not shareable",message:"Local files and data URLs do not work reliably for profile visitors.",normalized,source:"external"};
  let url:URL;
  try { url=new URL(normalized); } catch { return {status:"error",label:"Invalid URL",message:"Use a complete public URL beginning with https://.",normalized,source:"external"}; }
  if(url.protocol!=="https:") return {status:"error",label:"HTTPS required",message:"Janitor profile images should use a secure https:// URL.",normalized,source:"external"};
  const host=url.hostname.toLowerCase(), path=url.pathname.toLowerCase();
  const imageFile=/\.(?:png|jpe?g|gif|webp|avif)$/i.test(path);
  if(host==="ella.janitorai.com" && path.startsWith("/media-approved/")) return {status:imageFile?"good":"warning",label:"Ella media-approved",message:imageFile?"Recognized Janitor-hosted media-approved URL.":"Ella URL recognized, but the path has no common image extension.",normalized,source:"ella-approved"};
  if(host==="ella.janitorai.com") return {status:imageFile?"good":"warning",label:"Ella CDN",message:imageFile?"Recognized Janitor's Ella image host.":"Ella host recognized, but the path has no common image extension.",normalized,source:"ella"};
  return {status:imageFile?"good":"warning",label:imageFile?"Direct image":"Check direct link",message:imageFile?"Public HTTPS image URL detected.":"The URL does not end in a common image extension; previews or Janitor may reject the webpage link.",normalized,source:"external"};
}

function generateElementFrameRules(c:StudioConfig){
  const desktop:string[]=[],mobile:string[]=[];
  Object.entries(c.elementOffsets||{}).forEach(([storageId,frame])=>{
    const mobileFrame=storageId.startsWith("mobile:"),id=mobileFrame?storageId.slice(7):storageId,target=editableTargets.find(item=>item.id===id);
    if(!target)return;
    const hasWidth=Number.isFinite(frame.width),hasHeight=Number.isFinite(frame.height);
    if(!frame.x&&!frame.y&&!hasWidth&&!hasHeight)return;
    const preservesPosition=["page","header","profile","footer","tab-indicator","star"].includes(id);
    const positioned=preservesPosition?`translate:${Math.round(frame.x)}px ${Math.round(frame.y)}px!important;`:`position:relative!important;left:${Math.round(frame.x)}px!important;top:${Math.round(frame.y)}px!important;`;
    const width=hasWidth?`width:${Math.max(16,Math.round(frame.width!))}px!important;min-width:0!important;max-width:none!important;flex-basis:auto!important;`:"";
    const height=hasHeight?`height:${Math.max(12,Math.round(frame.height!))}px!important;min-height:0!important;max-height:none!important;`:"";
    const rule=`${target.selector}{${positioned}${width}${height}}`;
    if(mobileFrame){mobile.push(rule);return}
    desktop.push(rule);
  });
  const scoped:string[]=[];
  if(desktop.length)scoped.push(`@media only screen and (min-width:${c.breakpoint+1}px){${desktop.join("")}}`);
  if(mobile.length)scoped.push(`@media only screen and (max-width:${c.breakpoint}px){${mobile.join("")}}`);
  return scoped;
}

function generateCharacterStructureRules(c:StudioConfig){
  const order=Object.fromEntries(c.characterOrder.map((name,index)=>[name,index+1])) as Record<CharacterSection,number>;
  const paginationOrder=Math.max(...Object.values(order))+1;
  const sharedResultsRow=Math.abs(order.count-order.filters)===1;
  const flattened=[
    ".pp-tabs-panels", ".profile-tabs-panels",
    ".profile-tab-panel:not([hidden]):not([aria-hidden=\"true\"])",
    ".profile-tab-panel:not([hidden]):not([aria-hidden=\"true\"]) > :only-child",
    ".characters-list-container-flex", ".character-list-pagination-flex > :only-child",
    ".character-list-pagination-box", ".character-list-pagination-box > .profile-pagination-flex-outer", ".css-zdpt2t",
  ];
  if(!sharedResultsRow)flattened.push(".character-list-pagination-flex");
  const resultsRow=sharedResultsRow?`.character-list-pagination-flex { display: flex !important; justify-content: space-between !important; gap: 12px !important; flex-wrap: wrap !important; order: ${Math.min(order.count,order.filters)} !important; }`:"";
  return `.profile-tabs-chakra-tabs { display: flex !important; flex-direction: column !important; }
${flattened.join(", ")} { display: contents !important; }
${resultsRow}
.profile-tab-panel[hidden], .profile-tab-panel[aria-hidden="true"], [role="tabpanel"][hidden] { display: none !important; }
.pp-tabs-wrapper, .profile-tabs-wrapper { order: ${order.tabs} !important; }
.pp-pg-total, .profile-badge-flex-outer { order: ${order.count} !important; }
.profile-filters-flex-outer { order: ${order.filters} !important; }
.pp-cc-list-container, .card-row { order: ${order.cards} !important; display: flex !important; flex-wrap: wrap !important; gap: ${c.cardGap}px !important; justify-content: ${c.cardJustify} !important; }
.characters-list-container-flex > .profile-pagination-flex-outer { order: ${paginationOrder} !important; }`;
}

export function generateCss(c:StudioConfig, widgets:Widgets){
  const dir = c.layout === "right" ? "row-reverse" : c.layout === "stack" ? "column" : "row";
  const profileOrder = Object.fromEntries(c.profileOrder.map((name,index)=>[name,index+1]));
  const profileBackground = background(c.profileColor,c.profileGradientTo,c.profileGradient);
  const cardBackground = background(c.cardColor,c.cardGradientTo,c.cardGradient);
  const pageFilter = `blur(${c.pageBlur}px) brightness(${c.pageBrightness}%) contrast(${c.pageContrast}%) saturate(${c.pageSaturate}%)`;
  const rules:string[] = [];
  const addMotion=(name:string,motion:MotionStyle,selector:string,baseTransform="",endOpacity=1)=>{
    if(motion==="none")return;
    const base=baseTransform?`${baseTransform} `:"";
    const frames=motion==="float"?`0%,100%{transform:${base}translateY(0)}50%{transform:${base}translateY(-6px)}`:motion==="pulse"?`0%,100%{transform:${base}scale(1)}50%{transform:${base}scale(1.025)}`:motion==="glow"?"0%,100%{filter:drop-shadow(0 0 0 transparent)}50%{filter:drop-shadow(0 0 10px currentColor)}":`0%{opacity:0;transform:${base}translateX(-18px)}100%{opacity:${endOpacity};transform:${base}translateX(0)}`;
    rules.push(`@keyframes jps-${name}-${motion}{${frames}} @media (prefers-reduced-motion:no-preference){${selector}{animation:jps-${name}-${motion} ${motion==="slide"?".5s":"3.2s"} ease-in-out ${motion==="slide"?"1":"infinite"}!important}}`);
  };
  rules.push(`/* Janitor Profile Studio — validator-safe semantic selectors */`);
  rules.push(`.pp-page-background, .profile-page-background {
  background-color: ${c.pageColor} !important;
  background-size: ${c.pageSize} !important; background-position: ${safeText(c.pagePosition)} !important; background-repeat: ${c.pageRepeat} !important;
  background-attachment: ${c.pageAttachment} !important; background-blend-mode: ${c.pageBlend} !important;
  filter: ${pageFilter} !important; -webkit-filter: ${pageFilter} !important;${c.pageBlur ? `\n  transform: scale(1.03) !important;` : ""}
}`);
  if(c.overlayOpacity || c.vignette) rules.push(`.pp-page-background::after, .profile-page-background::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 45%, ${rgba("#000000",c.vignette)} 100%), ${rgba(c.overlayColor,c.overlayOpacity)} !important;
}`);
  rules.push(`.profile-page-container { max-width: ${c.maxWidth}px !important; margin-left: auto !important; margin-right: auto !important; }`);
  rules.push(`.profile-page-flex { display: flex !important; flex-direction: ${dir} !important; gap: ${c.layoutGap}px !important; align-items: flex-start !important; }`);
  rules.push(`.pp-uc-background, .profile-uc-background, .profile-uc-background-flex {
  width: ${c.profileWidth}px !important; min-width: ${c.profileWidth}px !important; max-width: ${c.profileWidth}px !important; flex-basis: ${c.profileWidth}px !important;
  position: ${c.profileSticky?"sticky":"relative"} !important; left: 0; top: ${c.profileSticky?c.headerHeight+16:0}px !important;
  padding: ${c.profilePadding}px !important; background: ${profileBackground} !important; background-size: cover !important; background-position: center !important;
  border: ${c.profileBorderWidth}px ${c.profileBorderStyle} ${c.profileBorderColor} !important; border-radius: ${c.profileRadius}px !important;
  box-shadow: ${shadow(c.profileShadow,c.profileGlow,c.profileBorderColor)} !important; opacity: ${(c.profileOpacity/100).toFixed(2)} !important;
  min-height: ${c.profileMinHeight}px !important; text-align: ${c.profileAlign} !important;${c.profileGlass ? `\n  backdrop-filter: blur(${c.profileGlass}px); -webkit-backdrop-filter: blur(${c.profileGlass}px);` : ""}
}`);
  rules.push(`.profile-background-box-1 { background: transparent !important; } .profile-background-box-2 { background: transparent !important; } .profile-background-box-3 { background: transparent !important; }`);
  rules.push(`.pp-uc-avatar, .profile-avatar {
  width: ${c.avatarSize}px !important; height: ${c.avatarSize}px !important; object-fit: cover !important;
  border-radius: ${c.avatarRadius}px !important; border: ${c.avatarBorderWidth}px solid ${c.avatarBorderColor} !important;
  box-shadow: ${c.avatarGlow ? `0 0 ${c.avatarGlow}px ${rgba(c.avatarBorderColor,60)}` : "none"} !important;
  filter: ${c.avatarFilter} !important; -webkit-filter: ${c.avatarFilter} !important; clip-path: ${clip(c.avatarClip)};
  transform: rotate(${c.avatarRotate}deg); transition: transform .22s ease, filter .22s ease;
}`);
  if(c.avatarHoverRestore || c.avatarHoverScale !== 100) rules.push(`.pp-uc-avatar:hover, .profile-avatar:hover {${c.avatarHoverRestore ? " filter: none !important; -webkit-filter: none !important;" : ""} transform: rotate(${c.avatarRotate}deg) scale(${(c.avatarHoverScale/100).toFixed(2)}); }`);
  rules.push(`.pp-uc-title, .profile-title-heading {
  color: ${c.titleColor} !important; font-family: "${safeText(c.titleFont)}", serif !important; font-size: ${c.titleSize}px !important;
  font-weight: ${c.titleWeight} !important; font-style: ${c.titleItalic ? "italic" : "normal"} !important; font-variant: ${c.titleCaps ? "small-caps" : "normal"} !important;
  letter-spacing: ${c.titleSpacing}px !important; text-transform: ${c.titleTransform} !important; text-shadow: ${c.titleGlow ? `0 0 ${c.titleGlow}px ${rgba(c.titleColor,65)}` : "none"} !important;
}`);
  rules.push(`.profile-info-wrapper-box, .profile-info-stack, .profile-about-me, .pp-uc-about-me { color: ${c.bodyColor} !important; font-family: "${safeText(c.bodyFont)}", sans-serif !important; font-size: ${c.bodySize}px !important; line-height: ${(c.bodyLineHeight/100).toFixed(2)} !important; text-shadow: ${c.bodyGlow ? `0 0 ${c.bodyGlow}px ${rgba(c.bodyColor,55)}` : "none"} !important; }`);
  rules.push(`.profile-info-wrapper-box > .profile-info-stack { display: flex !important; flex-direction: column !important; } .profile-info-wrapper-box > .profile-info-stack > .profile-info-hstack { order: ${profileOrder.identity} !important; } .profile-info-wrapper-box > .profile-info-stack > .profile-about-me, .profile-info-wrapper-box > .profile-info-stack > .pp-uc-about-me { order: ${profileOrder.about} !important; } .profile-info-wrapper-box > .profile-info-stack > .profile-uc-follow-flex, .profile-info-wrapper-box > .profile-info-stack > .pp-uc-about-me + *, .profile-info-wrapper-box > .profile-info-stack > .pp-uc-follow-button, .profile-info-wrapper-box > .profile-info-stack > .profile-uc-follow-button { order: ${profileOrder.follow} !important; }`);
  rules.push(`.pp-uc-followers-count, .profile-followers-count, .pp-uc-member-since, .profile-member-since-box { color: ${c.mutedColor} !important; }`);
  rules.push(`.profile-character-card-creator-name-link, .profile-character-card-creator-name-box { color: ${c.linkColor} !important; } .profile-character-card-creator-name-link:hover { color: ${c.linkHoverColor} !important; }`);
  rules.push(generateCharacterStructureRules(c));
  rules.push(`.pp-cc-wrapper, .profile-character-card-wrapper {
  width: ${c.cardWidth}px !important; min-width: ${c.cardWidth}px !important; max-width: ${c.cardWidth}px !important; flex-basis: ${c.cardWidth}px !important;
  min-height: ${c.cardMinHeight}px !important; overflow: hidden !important; border: ${c.cardBorderWidth}px ${c.cardBorderStyle} ${c.cardBorderColor} !important;
  border-radius: ${c.cardRadius}px !important; background: ${cardBackground} !important; background-size: cover !important; background-position: center !important;
  box-shadow: ${shadow(c.cardShadow,0,c.cardBorderColor)} !important; opacity: ${(c.cardOpacity/100).toFixed(2)} !important; transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease !important;
}`);
  rules.push(`.profile-character-card-stack { background: transparent !important; color: ${c.bodyColor} !important; border-radius: ${c.cardRadius}px !important; }`);
  rules.push(`.pp-cc-gradient-1, .pp-cc-gradient-2, .pp-cc-gradient-3 { background: transparent !important; }`);
  if(c.cardHoverLift || c.cardHoverGlow || c.cardHoverScale !== 100) rules.push(`.pp-cc-wrapper:hover, .profile-character-card-wrapper:hover { transform: translateY(-${c.cardHoverLift}px) scale(${(c.cardHoverScale/100).toFixed(2)}); box-shadow: ${shadow(c.cardShadow+8,c.cardHoverGlow,c.cardBorderColor)} !important; }`);
  rules.push(`.pp-cc-avatar, .profile-character-card-avatar-image {
  height: ${c.botImageHeight}px !important; object-fit: cover !important; object-position: ${safeText(c.botImagePosition)} !important; filter: ${c.botImageFilter} !important; -webkit-filter: ${c.botImageFilter} !important;
  transform: scale(${(c.botImageZoom/100).toFixed(2)});
  clip-path: ${clip(c.botImageClip)};${c.botImageMask ? `\n  mask-image: linear-gradient(black, black 68%, transparent); -webkit-mask-image: linear-gradient(black, black 68%, transparent);` : ""}
}`);
  if(c.botImageHoverRestore) rules.push(`.pp-cc-avatar:hover, .profile-character-card-avatar-image:hover { filter: none !important; -webkit-filter: none !important; }`);
  rules.push(`.pp-cc-name, .profile-character-card-name-box { color: ${c.cardNameColor} !important; } .pp-cc-creator-name, .profile-character-card-creator-name-box { color: ${c.creatorColor} !important; }`);
  rules.push(`.css-96l1id, .pp-cc-description, .profile-character-card-description-box, .profile-character-card-description-markdown-container, .profile-character-card-description-markdown-container p { color: ${c.descriptionColor} !important; font-size: ${c.descriptionSize}px !important; text-align: ${c.descriptionAlign} !important; }`);
  rules.push(`.pp-cc-tokens-count, .profile-character-card-tokens-count { color: ${c.tokenColor} !important; }`);
  rules.push(`.pp-cc-tags, .profile-character-card-tags, .card-tags { gap: ${c.tagGap}px !important; } .pp-cc-tags-item, .profile-character-card-tags-item { background: ${c.tagColor} !important; color: ${c.tagTextColor} !important; border: 1px solid ${c.tagBorderColor} !important; border-radius: ${c.tagRadius}px !important; font-size: ${c.tagSize}px !important; }`);
  rules.push(`.pp-cc-ribbon, .profile-character-card-ribbon { background: transparent !important; padding: 0 !important; } .pp-cc-ribbon-wrap, .profile-character-card-ribbon-wrap, .profile-character-card-ribbon > .pp-cc-chats-count { display: block; padding: 4px 7px; background: ${c.ribbonColor} !important; border-radius: 4px 0 0 4px; } .pp-cc-star, .profile-character-card-star { filter: ${c.starFilter} !important; -webkit-filter: ${c.starFilter} !important; }`);
  rules.push(`.pp-top-bar:not(.pp-top-bar-inner), .profile-top-bar-flex-outer, .pp-top-bar-outer {
  height: ${c.headerHeight}px !important; min-height: ${c.headerHeight}px !important; color: ${c.headerTextColor} !important; background: ${c.headerGradient ? `linear-gradient(180deg, ${c.headerColor}, ${c.headerGradientTo})` : c.headerColor} !important;
  border-bottom: 1px solid ${c.headerBorderColor} !important; border-radius: ${c.headerRadius}px !important;${c.headerBlur ? `\n  backdrop-filter: blur(${c.headerBlur}px); -webkit-backdrop-filter: blur(${c.headerBlur}px);` : ""}
}`);
  rules.push(`.pp-top-bar-logo, .profile-top-bar-logo-box, .profile-top-bar-logo-name, .profile-top-bar-logo-sub-name { color: ${c.headerLogoColor} !important; } .profile-top-bar-search-box { color: ${c.headerSearchTextColor} !important; background: ${c.headerSearchColor} !important; border-radius: ${Math.max(4,c.headerRadius)}px !important; } .pp-top-bar-search, .profile-top-bar-search { color: ${c.headerSearchTextColor} !important; } .pp-top-bar-create-char, .profile-top-bar-create-char { color: ${c.headerTextColor} !important; background: ${c.headerCreateColor} !important; border-color: ${c.headerBorderColor} !important; border-radius: ${Math.max(4,c.headerRadius)}px !important; } [aria-label="Notifications"], .pp-top-bar-app-menu, .pp-top-bar-right .top-icon { color: ${c.headerTextColor} !important; background: ${c.headerIconColor} !important; border-radius: ${Math.max(4,c.headerRadius)}px !important; }`);
  rules.push(`.pp-tabs-wrapper, .profile-tabs-wrapper { background: ${c.tabColor} !important; border-color: ${c.tabActiveColor} !important; border-radius: ${c.tabRadius}px !important; overflow: hidden !important; box-shadow: ${c.tabGlow?`0 0 ${c.tabGlow}px ${rgba(c.tabActiveColor,60)}`:"none"} !important; } .pp-tabs-button, .profile-tabs-button { color: ${c.tabTextColor} !important; background: ${c.tabColor} !important; } .pp-tabs-button[data-selected], .profile-tabs-button[data-selected], .pp-tabs-button[aria-selected="true"], .profile-tabs-button[aria-selected="true"] { color: ${c.tabActiveColor} !important; } .pp-tabs-indicator, .profile-tabs-indicator { background: ${c.tabActiveColor} !important; }`);
  rules.push(`.pp-fl-search-input, .profile-character-search-input, .pp-fl-filter-button, .profile-filter-button, .transparent .react-select__control {
  color: ${c.searchTextColor} !important; background: ${c.searchColor} !important; border: 1px solid ${c.searchBorderColor} !important; border-radius: ${c.searchRadius}px !important;
}`);
  rules.push(`.profile-character-search-input-group { width: ${c.searchWidth}px !important; min-width: ${c.searchWidth}px !important; } .profile-filters-flex-inner-onorderchanged, .transparent .react-select__control, .sort-control { color: ${c.searchTextColor} !important; background: ${c.searchColor} !important; border-color: ${c.searchBorderColor} !important; border-radius: ${c.searchRadius}px !important; }`);
  rules.push(`.Btn, .Btn2, .Btn2-purple, .pp-uc-follow-button, .profile-uc-follow-button, .pressable-button, .jps-link-button {
  color: ${c.controlTextColor} !important; background: ${c.controlColor} !important; border: 1px solid ${c.controlBorderColor} !important;
  border-radius: ${c.controlRadius}px !important; text-decoration: none !important; box-shadow: ${c.controlGlow ? `0 0 ${c.controlGlow}px ${rgba(c.controlBorderColor,55)}` : "none"} !important;
}`);
  if(c.followLabel !== "Follow") rules.push(`.pp-uc-follow-text, .profile-uc-follow-text { font-size: 0 !important; } .pp-uc-follow-text::after, .profile-uc-follow-text::after { content: "${safeText(c.followLabel)}"; font-size: ${c.bodySize}px; }`);
  rules.push(`.pp-mnb-wrapper, .pp-mnb-container, .pp-footer, footer { min-height: ${c.footerHeight}px !important; color: ${c.footerTextColor} !important; background: ${c.footerColor} !important; border-top: 1px solid ${c.footerBorderColor} !important; justify-content: ${c.footerAlign==="left"?"flex-start":c.footerAlign} !important; } .pp-mnb-wrapper a, .pp-mnb-container a, .pp-footer a, footer a { color: ${c.footerTextColor} !important; }`);
  addMotion("header",c.headerAnimation,".pp-top-bar:not(.pp-top-bar-inner), .profile-top-bar-flex-outer, .pp-top-bar-outer");
  addMotion("tabs",c.tabAnimation,".pp-tabs-wrapper, .profile-tabs-wrapper");
  addMotion("search",c.searchAnimation,".profile-filters-flex-outer");
  addMotion("footer",c.footerAnimation,".pp-mnb-wrapper, .pp-footer, footer");
  if(c.imageFilterAll !== "none") rules.push(`.profile-page-container img { filter: ${c.imageFilterAll}; -webkit-filter: ${c.imageFilterAll}; transition: filter .2s ease; }${c.imageHoverRestoreAll ? ` .profile-page-container img:hover { filter: none; -webkit-filter: none; }` : ""}`);
  if(c.hideStar) rules.push(`.pp-cc-star, .profile-character-card-star { visibility: hidden !important; }`);
  if(c.hideTokens) rules.push(`.pp-cc-tokens-count, .profile-character-card-tokens-count { display: none !important; }`);
  if(c.hideTags) rules.push(`.pp-cc-tags, .profile-character-card-tags { display: none !important; }`);
  if(c.hideCreator) rules.push(`.pp-cc-creator-name, .profile-character-card-creator-name-box, .profile-character-card-creator-name-link { display: none !important; }`);
  if(c.hideDescription) rules.push(`.css-96l1id, .pp-cc-description, .profile-character-card-description-box, .profile-character-card-description-markdown-container { display: none !important; }`);
  if(c.hideRibbon) rules.push(`.pp-cc-ribbon-wrap, .profile-character-card-ribbon-wrap, .pp-cc-ribbon, .profile-character-card-ribbon { display: none !important; }`);
  if(c.hideFollowers) rules.push(`.pp-uc-followers-count, .profile-followers-count { display: none !important; }`);
  if(c.hideMemberSince) rules.push(`.pp-uc-member-since, .profile-member-since-box { display: none !important; }`);
  if(c.hideAbout) rules.push(`.profile-about-me, .pp-uc-about-me { display: none !important; }`);
  if(c.hideSearch) rules.push(`.profile-filters-flex-inner-hassearchfilter, .profile-character-search-input-group { display: none !important; }`);
  if(c.hideHeader) rules.push(`.pp-top-bar:not(.pp-top-bar-inner), .profile-top-bar-flex-outer, .pp-top-bar-outer { display: none !important; }`);
  if(c.hideFooter) rules.push(`.pp-mnb-wrapper, .pp-footer, footer { display: none !important; }`);
  rules.push(`.profile-page-container ::selection { background: ${c.selectionColor}; color: ${c.bodyColor}; }`);
  if(c.profileAnimation !== "none") rules.push(`@keyframes jps-profile-${c.profileAnimation} { 0%,100% { transform: ${c.profileAnimation === "float" ? "translateY(0)" : "scale(1)"}; } 50% { transform: ${c.profileAnimation === "float" ? "translateY(-6px)" : "scale(1.015)"}; } } @media (prefers-reduced-motion:no-preference){.pp-uc-background, .profile-uc-background { animation: jps-profile-${c.profileAnimation} ${c.profileAnimation === "float" ? "4s" : "3s"} ease-in-out infinite; }}`);
  if(c.cardAnimation !== "none") rules.push(`@keyframes jps-card-${c.cardAnimation} { from { opacity: 0; transform: ${c.cardAnimation === "rise" ? "translateY(18px)" : "none"}; } to { opacity: ${(c.cardOpacity/100).toFixed(2)}; transform: none; } } @media (prefers-reduced-motion:no-preference){.pp-cc-wrapper, .profile-character-card-wrapper { animation: jps-card-${c.cardAnimation} .45s ease both; }}`);
  if(c.profileAnimation !== "none" || c.cardAnimation !== "none") rules.push(`@media (prefers-reduced-motion: reduce) { .pp-uc-background, .profile-uc-background, .pp-cc-wrapper, .profile-character-card-wrapper { animation: none !important; } }`);
  if(widgets.links.length) rules.push(`.jps-links { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; } .jps-link-button { display: inline-block; padding: 10px 16px; font-weight: 700; }`);
  if(widgets.imageButtons.length) rules.push(`.jps-image-buttons { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; } .jps-image-button img { height: auto; transition: transform .2s ease; } .jps-image-button:hover img { transform: translateY(-2px); }`);
  if(widgets.details.length) rules.push(`.jps-details { margin: 10px 0; border: 1px solid ${c.controlBorderColor}; border-radius: ${c.controlRadius}px; overflow: hidden; } .jps-details summary { cursor: pointer; padding: 10px 12px; color: ${c.controlTextColor}; background: ${c.controlColor}; font-weight: 700; } .jps-details p { padding: 10px 12px; margin: 0; color: ${c.bodyColor}; }`);
  if(widgets.experiences.length) rules.push(`.jps-experiences { display: grid; gap: 10px; margin: 12px 0; } .jps-experience { position: relative; display: grid; grid-template-columns: auto 1fr; gap: 4px 11px; padding: 13px 14px; overflow: hidden; color: ${c.bodyColor} !important; background: ${c.controlColor}; border: 1px solid ${c.controlBorderColor}; border-radius: ${c.controlRadius}px; text-decoration: none !important; box-shadow: ${c.controlGlow ? `0 0 ${c.controlGlow}px ${rgba(c.controlBorderColor,45)}` : "none"}; transition: transform .2s ease, border-color .2s ease; } .jps-experience:hover { transform: translateY(-2px); border-color: ${c.linkHoverColor}; } .jps-experience-kind { grid-row: 1 / 4; align-self: start; min-width: 42px; padding: 6px 7px; color: ${c.controlTextColor}; background: ${c.tabActiveColor}; border-radius: ${Math.max(4,Math.round(c.controlRadius/2))}px; font-size: 8px; font-weight: 800; letter-spacing: 1px; text-align: center; text-transform: uppercase; } .jps-experience strong { color: ${c.linkColor}; font-size: 14px; } .jps-experience p { margin: 0; color: ${c.mutedColor}; font-size: 11px; line-height: 1.45; } .jps-experience b { color: ${c.linkHoverColor}; font-size: 9px; letter-spacing: .8px; text-transform: uppercase; }`);
  widgets.layers.forEach(layer=>{
    const selector=`.jps-layer-${layer.id}`;
    const filled=["box","button","badge"].includes(layer.kind);
    const padding=layer.kind==="divider"?"0":layer.kind==="badge"?"6px 10px":layer.kind==="button"?"10px 16px":layer.kind==="box"?"14px":"4px";
    rules.push(`${selector}{position:relative!important;display:${layer.hidden?"none":layer.kind==="button"?"inline-flex":layer.kind==="badge"?"inline-flex":"block"}!important;left:${layer.x}px!important;top:${layer.y}px!important;width:${layer.width}px!important;max-width:100%!important;${layer.height>0?`height:${layer.height}px!important;min-height:0!important;`:""}padding:${padding}!important;color:${layer.color}!important;background:${filled?layer.background:"transparent"}!important;border-radius:${layer.radius}px!important;font-size:${layer.fontSize}px!important;opacity:${(layer.opacity/100).toFixed(2)}!important;z-index:${layer.zIndex}!important;transform:rotate(${layer.rotation}deg);${layer.kind==="button"?"align-items:center!important;justify-content:center!important;text-decoration:none!important;font-weight:800!important;":""}${layer.kind==="badge"?"align-items:center!important;justify-content:center!important;font-weight:800!important;":""}}${selector} img{display:block!important;width:100%!important;height:${layer.height>0?"100%":"auto"}!important;object-fit:cover!important;border-radius:${layer.radius}px!important}${selector}.jps-layer-divider{height:${Math.max(1,layer.height||2)}px!important;padding:0!important;background:${layer.background}!important}`);
    addMotion(`layer-${layer.id}`,layer.animation,selector,`rotate(${layer.rotation}deg)`,layer.opacity/100);
  });
  widgets.dolls.forEach((d,i)=>rules.push(`.jps-page-doll-${i+1} { position: fixed; ${d.side}: 10px; bottom: ${d.bottom}px; z-index: 1000; pointer-events: none; } .jps-page-doll-${i+1} img { width: ${d.width}px; max-width: 100%; height: auto; }`));
  rules.push(`@media only screen and (max-width: ${c.breakpoint}px) {
  .profile-page-container { padding-left: ${c.mobilePadding}px !important; padding-right: ${c.mobilePadding}px !important; }
  .profile-page-flex { flex-direction: column !important; gap: ${Math.max(10,Math.round(c.layoutGap*.65))}px !important; }
  .pp-uc-background, .profile-uc-background, .profile-uc-background-flex { width: 100% !important; min-width: 0 !important; max-width: 100% !important; flex-basis: auto !important; position: relative !important; top: auto !important; }
  .pp-cc-wrapper, .profile-character-card-wrapper { width: ${c.mobileCardWidth}px !important; min-width: ${c.mobileCardWidth}px !important; max-width: 100% !important; flex-basis: ${c.mobileCardWidth}px !important; }${c.hideOverlayMobile ? `\n  .profile-page-container::after { display: none !important; }` : ""}
  ${widgets.dolls.map((d,i)=>d.hideMobile ? `.jps-page-doll-${i+1}` : "").filter(Boolean).join(", ")} ${widgets.dolls.some(d=>d.hideMobile) ? "{ display: none !important; }" : ""}
}`);
  rules.push(...generateElementFrameRules(c));
  if(c.customCss.trim()) rules.push(`/* Custom additions */\n${unwrap(c.customCss).trim()}`);
  return ensureWrapped(rules.join("\n\n"));
}

export function generateCanvasOverrides(c:StudioConfig,widgets:Widgets){
  const rules=[`/* Patchies canvas overrides — appended after imported/manual CSS */`];
  const characterOrderChanged=c.characterOrder.some((section,index)=>section!==defaults.characterOrder[index]);
  if(characterOrderChanged)rules.push(generateCharacterStructureRules(c));
  rules.push(...generateElementFrameRules(c));
  widgets.layers.forEach(layer=>{const selector=`.jps-layer-${layer.id}`,filled=["box","button","badge"].includes(layer.kind),padding=layer.kind==="divider"?"0":layer.kind==="badge"?"6px 10px":layer.kind==="button"?"10px 16px":layer.kind==="box"?"14px":"4px";rules.push(`${selector}{position:relative!important;display:${layer.hidden?"none":layer.kind==="button"||layer.kind==="badge"?"inline-flex":"block"}!important;left:${layer.x}px!important;top:${layer.y}px!important;width:${layer.width}px!important;max-width:100%!important;${layer.height>0?`height:${layer.height}px!important;min-height:0!important;`:""}padding:${padding}!important;color:${layer.color}!important;background:${filled?layer.background:"transparent"}!important;border-radius:${layer.radius}px!important;font-size:${layer.fontSize}px!important;opacity:${(layer.opacity/100).toFixed(2)}!important;z-index:${layer.zIndex}!important;transform:rotate(${layer.rotation}deg)}${selector} img{display:block!important;width:100%!important;height:${layer.height>0?"100%":"auto"}!important;object-fit:cover!important;border-radius:${layer.radius}px!important}${selector}.jps-layer-divider{height:${Math.max(1,layer.height||2)}px!important;padding:0!important;background:${layer.background}!important}`);if(layer.animation!=="none"){const rotate=`rotate(${layer.rotation}deg) `,frames=layer.animation==="float"?`0%,100%{transform:${rotate}translateY(0)}50%{transform:${rotate}translateY(-6px)}`:layer.animation==="pulse"?`0%,100%{transform:${rotate}scale(1)}50%{transform:${rotate}scale(1.025)}`:layer.animation==="glow"?"0%,100%{filter:drop-shadow(0 0 0 transparent)}50%{filter:drop-shadow(0 0 10px currentColor)}":`0%{opacity:0;transform:${rotate}translateX(-18px)}100%{opacity:${(layer.opacity/100).toFixed(2)};transform:${rotate}translateX(0)}`;rules.push(`@keyframes jps-layer-${layer.id}-${layer.animation}{${frames}}@media(prefers-reduced-motion:no-preference){${selector}{animation:jps-layer-${layer.id}-${layer.animation} ${layer.animation==="slide"?".5s":"3.2s"} ease-in-out ${layer.animation==="slide"?"1":"infinite"}!important}}`)}});
  return ensureWrapped(rules.join("\n\n"));
}

const PATCHIES_HTML_START="<!-- PATCHIES:GENERATED:START -->";
const PATCHIES_HTML_END="<!-- PATCHIES:GENERATED:END -->";

export function generateHtml(w:Widgets){
  const chunks:string[]=[];
  w.layers.forEach(layer=>{
    if(layer.kind==="button"){chunks.push(`<a class="jps-explorer-layer jps-layer-${layer.id} jps-layer-button" href="${escapeHtml(layer.url)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(layer.content||layer.name)}</a>`);return}
    const body=layer.kind==="image"?`<img src="${escapeHtml(layer.url)}" alt="${escapeHtml(layer.name)}">`:layer.kind==="box"?`<strong>${escapeHtml(layer.name)}</strong><p>${escapeHtml(layer.content)}</p>`:layer.kind==="divider"?"":escapeHtml(layer.content||layer.name);
    chunks.push(`<div class="jps-explorer-layer jps-layer-${layer.id} jps-layer-${layer.kind}">${body}</div>`);
  });
  if(w.experiences.length) chunks.push(`<div class="jps-experiences">\n${w.experiences.map(x=>`  <a href="${escapeHtml(x.url)}" class="jps-experience jps-experience-${x.kind}" target="_blank" rel="noopener noreferrer nofollow"><span class="jps-experience-kind">${escapeHtml(x.kind)}</span><strong>${escapeHtml(x.title)}</strong><p>${escapeHtml(x.description)}</p><b>${escapeHtml(x.label)} →</b></a>`).join("\n")}\n</div>`);
  if(w.links.length) chunks.push(`<div class="jps-links">\n${w.links.map(x=>`  <a href="${escapeHtml(x.url)}" class="jps-link-button" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(x.label)}</a>`).join("\n")}\n</div>`);
  if(w.imageButtons.length) chunks.push(`<div class="jps-image-buttons">\n${w.imageButtons.map(x=>`  <a href="${escapeHtml(x.url)}" class="jps-image-button" target="_blank" rel="noopener noreferrer nofollow"><img src="${escapeHtml(x.image)}" alt="${escapeHtml(x.alt)}" style="width:${x.width}px"></a>`).join("\n")}\n</div>`);
  w.details.forEach(x=>chunks.push(`<details class="jps-details"${x.open?" open":""}>\n  <summary>${escapeHtml(x.summary)}</summary>\n  <p>${escapeHtml(x.content)}</p>\n</details>`));
  w.dolls.forEach((x,i)=>chunks.push(`<div class="jps-page-doll-${i+1}"><img src="${escapeHtml(x.image)}" alt="${escapeHtml(x.alt)}"></div>`));
  return chunks.length?`${PATCHIES_HTML_START}\n${chunks.join("\n\n")}\n${PATCHIES_HTML_END}`:"";
}

export function mergeProfileHtml(manualHtml:string,generatedHtml:string){
  const manual=manualHtml.trim(),generated=generatedHtml.trim();
  const start=manual.indexOf(PATCHIES_HTML_START),end=start>=0?manual.indexOf(PATCHIES_HTML_END,start+PATCHIES_HTML_START.length):-1;
  if(start>=0&&end>=start){
    return `${manual.slice(0,start).trim()}\n\n${generated}\n\n${manual.slice(end+PATCHIES_HTML_END.length).trim()}`.trim();
  }
  return [manual,generated].filter(Boolean).join("\n\n");
}

export function inspectCss(source:string):Diagnostic[]{
  const s=source.trim(), body=unwrap(s), out:Diagnostic[]=[];
  const completeStyles=[...s.matchAll(STYLE_BLOCK_PATTERN)];
  const outsideStyles=completeStyles.length?s.replace(STYLE_BLOCK_PATTERN,"").trim():"";
  if(!s.startsWith("<style>")) out.push({level:"error",message:"The snippet must start with <style>. Export will repair this automatically."});
  if(!s.endsWith("</style>")) out.push({level:"error",message:"The snippet must end with </style>. Export will repair this automatically."});
  if(outsideStyles&&/<\/?[a-z][^>]*>/i.test(outsideStyles)) out.push({level:"error",message:"HTML was found outside the CSS style block. Import the complete source again and Patchies will split CSS from About Me HTML automatically."});
  if(/<\/?(?:div|details|summary|img|a|p|span|section|main|header|footer)\b/i.test(body)) out.push({level:"error",message:"HTML markup is sitting inside the CSS field. Move it to About Me HTML or re-import the complete source."});
  if(/\b(?:min|max|clamp)\s*\(/i.test(body)) out.push({level:"error",message:"Janitor's validator may reject min(), max(), and clamp(). Use width plus max-width/min-width instead."});
  if(/(?:mask-image|-webkit-mask-image)\s*:\s*url\s*\(/i.test(body)) out.push({level:"error",message:"Janitor blocks URL-based masks. Gradient masks and clip-path basic shapes are safer."});
  if(/clip-path\s*:\s*url\s*\(/i.test(body)) out.push({level:"warning",message:"URL clip paths may be sanitized. Use circle(), inset(), ellipse(), or polygon()."});
  if(/\burl\s*\(/i.test(body)) out.push({level:"error",message:"Janitor's current sanitizer can strip CSS url() values. Use an HTML image layer, image button, or page doll instead."});
  if(/@import\b/i.test(body)) out.push({level:"warning",message:"Imported fonts/styles can fail or be blocked. Prefer web-safe font stacks."});
  if(/button\[class\*=/i.test(body)) out.push({level:"warning",message:"Wildcard button selectors can style menus, pagination, and unrelated controls."});
  if(/(^|})\s*a\s*\{/im.test(body)) out.push({level:"warning",message:"A bare a selector affects navigation and footer links. Target Janitor semantic link classes."});
  if(/(^|,|})\s*header\s*(,|\{)/im.test(body)) out.push({level:"warning",message:"A bare header selector is broad. Prefer .profile-top-bar-flex-outer and .pp-top-bar-outer."});
  if(/<script\b/i.test(body)) out.push({level:"error",message:"Scripts are not CSS and should never be placed in the profile style field."});
  if(/file:\/\//i.test(body)) out.push({level:"error",message:"Local file URLs cannot load for profile visitors. Use an HTTPS image URL."});
  if(/ella\.janitor\.ai\//i.test(body)) out.push({level:"error",message:"The Ella hostname is ella.janitorai.com (not ella.janitor.ai). The image library can correct it for you."});
  if(/â€¢|â€™|ï¿½|�/.test(body)) out.push({level:"warning",message:"Broken text encoding detected. Replace mojibake characters before exporting."});
  const opens=(body.match(/\{/g)||[]).length, closes=(body.match(/\}/g)||[]).length;
  if(opens!==closes) out.push({level:"error",message:`Unbalanced braces: ${opens} opening and ${closes} closing braces.`});
  if(!out.some(x=>x.level==="error")) out.push({level:"info",message:"No known Janitor-blocking syntax was found. Semantic class names can still change when Janitor updates."});
  return out;
}

export const compatibility = [
  {status:"Works",items:["Solid colors and CSS gradients","HTML images and GIFs","Filters and hover filters","Gradient mask-image fades","clip-path basic shapes","Media queries","Text and box shadows","Pseudo-element text","HTML links, image buttons, details and page dolls"]},
  {status:"Risky",items:["Generated .css-xxxxx selectors","CSS url() backgrounds","@import and remote fonts","content: url() replacements","Broad html/body/header/a/button rules","Heavy blur and fixed overlays on mobile","New CSS functions accepted by browsers but rejected by Janitor's editor"]},
  {status:"Blocked",items:["JavaScript in profile content","file:// image paths","URL-based image masks","Some star/icon image replacements","CSS that escapes Janitor's sanitizer"]},
];


export type ImportedProfileSource = {
  css: string;
  html: string;
  kind: "janitor-page" | "profile-source";
  hadManagedHtml: boolean;
};

export function assembleProfileSource(css:string, html:string){
  return `${html.trim() ? `${html.trim()}\n\n` : ""}${ensureWrapped(css).trim()}`;
}

export function extractProfileSource(input:string):ImportedProfileSource {
  let source=input.trim(), kind:ImportedProfileSource["kind"]="profile-source";
  const marker='\\"about_me\\":\\"';
  const start=source.indexOf(marker);
  if(start>=0){
    const tail=source.slice(start+marker.length);
    const end=tail.search(/\\",\\"[a-zA-Z_][a-zA-Z0-9_]*\\":/);
    if(end<0) throw new Error("The page contains profile data, but its About Me field could not be separated.");
    try{
      source=JSON.parse(`"${tail.slice(0,end)}"`);
      source=JSON.parse(`"${source}"`);
      kind="janitor-page";
    }catch{throw new Error("The Janitor page source uses an About Me format this version cannot decode.")}
  }else if(/<html\b/i.test(source)){
    if(typeof DOMParser==="undefined") throw new Error("Saved-page HTML import is available in the browser editor.");
    const document=new DOMParser().parseFromString(source,"text/html");
    const block=document.querySelector<HTMLElement>(".pp-uc-about-me, .profile-about-me");
    if(!block) throw new Error("No editable About Me source was found in that saved page.");
    source=block.innerHTML;kind="janitor-page";
  }
  const styleOpenCount=(source.match(/<style\b[^>]*>/gi)||[]).length;
  const styleCloseCount=(source.match(/<\/style\s*>/gi)||[]).length;
  if(styleOpenCount!==styleCloseCount) throw new Error(`The source has ${styleOpenCount} opening and ${styleCloseCount} closing style blocks.`);
  const styles=[...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)];
  const css=styles.length?ensureWrapped(styles.map(match=>match[1]).join("\n\n")):ensureWrapped("");
  const html=source.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"").trim();
  const hadManagedHtml=html.includes(PATCHIES_HTML_START)&&html.includes(PATCHIES_HTML_END);
  const detachedHtml=hadManagedHtml?html.replace(PATCHIES_HTML_START,"").replace(PATCHIES_HTML_END,"").trim():html;
  return {css,html:detachedHtml,kind,hadManagedHtml};
}

const REAL_PREVIEW_BASE=`
*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,sans-serif;color:#f5f5f7;background:#25262b}body{position:relative;font-size:14px}.profile-top-bar-flex-outer{position:relative;z-index:30;height:64px;display:flex;align-items:center;padding:0 3.2%;background:#34353b;border-bottom:1px solid #45464d}.pp-top-bar{width:100%;display:flex;align-items:center;justify-content:space-between;gap:22px}.pp-top-bar-left{min-width:0;flex:1;display:flex;align-items:center;gap:24px}.profile-top-bar-logo-box{display:flex;align-items:flex-end;color:#f78af0;text-decoration:none}.profile-top-bar-logo-name{margin:0;font-size:25px;line-height:1;letter-spacing:2px}.profile-top-bar-logo-sub-name{margin:0 0 1px 4px;font-size:10px;font-weight:900}.profile-top-bar-search-wrapper{min-width:120px;max-width:760px;flex:1}.profile-top-bar-search-box{height:38px;display:flex;align-items:center;gap:8px;padding:0 13px;color:#bebec4;background:#4b4c53;border-radius:8px}.profile-top-bar-search{min-width:0;flex:1;color:#aaaab1;background:transparent;border:0;outline:0}.pp-top-bar-right{display:flex;align-items:center;gap:15px}.profile-top-bar-create-char{padding:8px 12px;color:#e6e6e9;text-decoration:none;border:1px solid #66676f;border-radius:7px;font-size:12px}.top-icon{display:grid;place-items:center;width:31px;height:31px;padding:0;color:#ddd;background:#494a50;border:0;border-radius:7px}.profile-uc-follow-flex{display:flex;gap:8px}.profile-uc-follow-button{min-width:0;flex:1}.profile-uc-options-menu{flex:none;padding:11px 14px;color:white;background:#383940;border:1px solid #666771;border-radius:7px;font-weight:800}
.profile-page-container{position:relative;z-index:1;width:100%;max-width:1680px;min-height:calc(100vh - 114px);margin:auto;padding:28px 3% 86px}.profile-page-background{position:fixed;z-index:0;inset:64px 0 50px;background:linear-gradient(120deg,#292a30,#3c3d43);background-position:center;background-size:cover}.profile-page-flex{position:relative;z-index:2;display:flex;align-items:flex-start;gap:30px}.profile-uc-background{position:relative;width:500px;min-width:360px;overflow:hidden;border:1px solid #666771;border-radius:8px;background:#2b2c31;box-shadow:0 12px 32px #0004}.profile-background-box-1,.profile-background-box-2,.profile-background-box-3{position:absolute;inset:0;pointer-events:none}.profile-background-box-1{background:linear-gradient(140deg,#9999a3,#33333de8 22%,#33333df2 88%,#9999a3)}.profile-background-box-2{background:linear-gradient(180deg,#1113,#1119)}.profile-background-box-3{background:radial-gradient(circle at 90% 10%,#af6eb029,transparent 40%)}.profile-info-wrapper-box{position:relative;padding:18px}.profile-info-stack{display:flex;flex-direction:column;gap:14px}.profile-info-hstack{display:flex;align-items:center;gap:18px}.profile-avatar-container{flex:none}.profile-avatar{display:block;width:150px;height:150px;object-fit:cover;border:2px solid #777883;border-radius:8px;background:linear-gradient(135deg,#492337,#17171b);box-shadow:0 8px 20px #0006}.profile-info-stack-inner{min-width:0;display:flex;flex:1;flex-direction:column;gap:8px}.profile-info-stack-inner-flex{min-width:0}.profile-title-heading{margin:0;overflow:hidden;color:white;font-size:28px;line-height:1.15;text-overflow:ellipsis}.profile-followers-count,.profile-member-since-box{color:white;font-weight:700;font-size:13px}.profile-about-me{width:100%;min-height:38px;color:#e1e1e5;line-height:1.55}.profile-about-me:empty{display:none}.profile-uc-follow-button{width:100%;padding:11px 16px;color:white;background:#9e3f8d;border:1px solid #d36cc0;border-radius:7px;font-weight:800}
.profile-page-container-flex-box{min-width:0;flex:1}.profile-tabs-chakra-tabs{display:flex;flex-direction:column;gap:18px}.profile-tabs-wrapper{position:relative;display:flex;width:max-content;max-width:100%;overflow-x:auto;border-bottom:1px solid #2dd4da;background:#15161b}.profile-tabs-button{min-width:100px;padding:10px 18px;color:#30dbe1;background:#15161b;border:0;font-weight:700;letter-spacing:1px;text-transform:uppercase}.profile-tabs-indicator{position:absolute;right:0;bottom:0;left:0;height:2px;background:#30dbe1;box-shadow:0 0 8px #30dbe1}.profile-tabs-panels,.profile-tab-panel{width:100%}.characters-list-container-flex{display:flex;flex-direction:column;gap:24px}.character-list-pagination-flex{display:flex;align-items:center;justify-content:space-between;gap:12px}.profile-badge-flex-outer{color:#c5c5ca;font-size:12px}.profile-filters-flex-outer{display:flex;justify-content:flex-end;gap:8px}.profile-character-search-input-group{min-width:230px}.profile-character-search-input,.profile-filter-button,.sort-control{height:38px;padding:0 13px;color:#ededf0;background:transparent;border:1px solid #666770;border-radius:8px}.profile-character-search-input{width:100%}.profile-filter-button{width:42px}.sort-control{min-width:95px}.pp-cc-list-container{display:flex;flex-wrap:wrap;align-items:stretch;gap:14px}
.profile-character-card-wrapper{position:relative;width:220px;min-width:220px;overflow:hidden;border:1px solid #765e9b;border-radius:8px;background:#111217;box-shadow:0 9px 24px #0005}.pp-cc-gradient-1,.pp-cc-gradient-2,.pp-cc-gradient-3{position:absolute;inset:0;pointer-events:none}.pp-cc-gradient-1{background:linear-gradient(160deg,#20162c,#0c0b0d 48%)}.pp-cc-gradient-2{background:radial-gradient(circle at 90% 2%,#9c4cb62e,transparent 35%)}.pp-cc-gradient-3{background:linear-gradient(180deg,transparent 60%,#49346833)}.profile-character-card-stack{position:relative;z-index:1;display:flex;min-height:100%;flex-direction:column}.profile-character-card-stack-link-component{color:inherit;text-decoration:none}.profile-character-card-stack-link-component-box{position:relative}.profile-character-card-name-box{min-height:44px;padding:10px 9px;color:#ef83ed;font-size:12px;font-weight:800;line-height:1.25}.profile-character-card-stats-box{position:absolute;z-index:2;top:43px;right:0}.profile-character-card-ribbon{padding:4px 7px;color:white;background:#6f4a90;border-radius:4px 0 0 4px;font-size:10px;font-weight:800}.profile-character-card-public-chats-hstack{display:none}.profile-character-card-avatar-aspect-ratio{position:relative;aspect-ratio:1/1;overflow:hidden}.profile-character-card-avatar-image{display:block;width:100%;height:100%;object-fit:cover;object-position:top}.profile-character-card-creator-name-link{display:block;padding:9px 10px 4px;color:#c7a9ed;text-decoration:none;font-size:11px;font-weight:800}.profile-character-card-description-box{min-height:76px;padding:0 10px;color:#d9d2e1}.profile-character-card-description-markdown-container{font-size:11px;line-height:1.45;text-align:center}.profile-character-card-description-markdown-container p{margin:7px 0}.profile-character-card-star-line{position:relative;width:80%;margin:8px auto;border-top:1px solid #b49ad8}.profile-character-card-star{position:absolute;right:-7px;top:-10px;color:#e6d5ff}.profile-character-card-tags{display:flex;flex-wrap:wrap;gap:5px;margin:0;padding:7px 9px 12px;list-style:none}.profile-character-card-tags-wrap{display:flex}.profile-character-card-tags-item{display:inline-flex;min-height:21px;align-items:center;padding:3px 7px;color:#e7dcf2;background:#2d2338;border:1px solid #705e87;border-radius:5px;font-size:9px;line-height:1.1}.profile-character-card-box{margin-top:auto;padding:0 9px 10px}.profile-character-card-tokens-count{margin:0;color:#afa6b7;text-align:center;font-size:10px}
.pp-footer{position:absolute;z-index:20;right:0;bottom:0;left:0;min-height:50px;display:flex;align-items:center;justify-content:space-between;gap:15px;padding:12px 7%;color:#aaaab0;background:#17171acc;font-size:11px}.pp-footer a{color:#a98ce0;text-decoration:none}.footer-links{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px}@media(max-width:900px){.profile-page-flex{flex-direction:column}.profile-uc-background{width:100%;min-width:0}.profile-page-container-flex-box{width:100%}.profile-top-bar-create-char{display:none}}@media(max-width:620px){.profile-top-bar-search-wrapper{display:none}.profile-page-container{padding:16px 12px 96px}.profile-info-hstack{align-items:flex-start}.profile-avatar{width:105px;height:105px}.profile-title-heading{font-size:22px}.character-list-pagination-flex{align-items:stretch;flex-direction:column}.profile-filters-flex-outer{justify-content:flex-start}.profile-character-search-input-group{min-width:0;flex:1}.pp-cc-list-container{justify-content:center}.pp-footer{align-items:flex-start;flex-direction:column}.footer-links{justify-content:flex-start}}
`;

export function previewDocumentV8(css:string,c:Pick<StudioConfig,"followLabel">,w:Widgets,htmlOverride:string|undefined,profile:PreviewProfileData,bots:PreviewBotData[]){
  const generatedHtml=generateHtml(w);
  const profileHtml=cleanPreviewMarkup(htmlOverride===undefined?generatedHtml:htmlOverride);
  const username=(profile.username.trim()||"ExampleCreator").replace(/^@+/,"");
  const avatar=profile.avatarUrl.trim()
    ? `<img class="pp-uc-avatar profile-avatar" src="${escapeHtml(safeUrl(profile.avatarUrl))}" alt="${escapeHtml(username)} preview avatar">`
    : `<div class="pp-uc-avatar profile-avatar preview-avatar-placeholder" aria-label="Empty preview avatar">?</div>`;
  const cards=bots.map((card,index)=>{
    const artwork=card.image.trim()
      ? `<img class="pp-cc-avatar profile-character-card-avatar-image" src="${escapeHtml(safeUrl(card.image))}" alt="${escapeHtml(card.name)}">`
      : `<div class="pp-cc-avatar profile-character-card-avatar-image preview-bot-placeholder"><span>TEST BOT<br>IMAGE</span></div>`;
    const tags=card.tags.map((tag,tagIndex)=>`<li class="pp-cc-tags-wrap profile-character-card-tags-wrap"><span class="pp-cc-tags-item profile-character-card-tags-item ${tagIndex===0?"profile-character-card-tag-limitless":""}">${escapeHtml(tag)}</span></li>`).join("");
    return `<article class="pp-cc-wrapper profile-character-card-wrapper" data-preview-bot="${index}">
      <div class="pp-cc-gradient-1"></div><div class="pp-cc-gradient-2"></div><div class="pp-cc-gradient-3"></div>
      <div class="profile-character-card-stack">
        <a class="profile-character-card-stack-link-component"><div class="profile-character-card-stack-link-component-box">
          <div class="pp-cc-name profile-character-card-name-box">${escapeHtml(card.name||"Untitled Test Bot")}</div>
          <div class="profile-character-card-stats-box"><div class="pp-cc-ribbon profile-character-card-ribbon"><div class="pp-cc-ribbon-wrap profile-character-card-ribbon-wrap"><span class="pp-cc-chats profile-character-card-chats-hstack"><span class="pp-cc-chats-count profile-character-card-chats-count">◫ ${escapeHtml(card.chats||"0")}</span></span><span class="pp-cc-public-chats profile-character-card-public-chats-hstack"><span class="profile-character-card-public-chats-icon">◇</span><span class="pp-cc-public-chats-count profile-character-card-public-chats-count">0</span></span></div></div></div>
          <div class="profile-character-card-avatar-aspect-ratio">${artwork}</div>
        </div></a>
        <a class="profile-character-card-creator-name-link"><span class="pp-cc-creator-name profile-character-card-creator-name-box">@${escapeHtml(username)}</span></a>
        <div class="profile-character-card-description-box"><div class="pp-cc-description profile-character-card-description-markdown-container"><p>${escapeHtml(card.description)}</p></div></div>
        <div class="pp-cc-star-line profile-character-card-star-line"><span class="pp-cc-star profile-character-card-star">✦</span></div>
        <ul class="pp-cc-tags profile-character-card-tags">${tags}</ul>
        <div class="profile-character-card-box"><p class="pp-cc-tokens-count profile-character-card-tokens-count">${escapeHtml(card.tokens||"0 tokens")}</p></div>
      </div>
    </article>`;
  }).join("");
  const countLabel=`${bots.length} ${bots.length===1?"character":"characters"}`;
  const cardArea=cards||`<div class="preview-empty-bots"><b>No local test bots.</b><span>Add one from Test data whenever you want.</span></div>`;
  return `<!doctype html>
<html data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${REAL_PREVIEW_BASE}.preview-avatar-placeholder,.preview-bot-placeholder{display:grid!important;place-items:center;text-align:center;color:#d7cbd9;background:repeating-linear-gradient(135deg,#2d2830 0 12px,#211e24 12px 24px)!important;font-weight:900;letter-spacing:.08em}.preview-bot-placeholder span{font-size:12px;line-height:1.5}.preview-empty-bots{display:flex;min-height:210px;width:100%;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:#b9b3bc;border:1px dashed #73717a;border-radius:10px}.preview-empty-bots span{font-size:12px}.jps-drag-mode .profile-uc-background,.jps-drag-mode .pp-cc-list-container{cursor:grab!important;outline:2px dashed #ff4e8a!important;outline-offset:4px!important}.jps-drag-mode .profile-uc-background:active,.jps-drag-mode .pp-cc-list-container:active{cursor:grabbing!important}</style>
<style id="jps-user-css">${unwrap(css)}</style></head><body>
<header class="profile-top-bar-flex-outer pp-top-bar-outer"><div class="pp-top-bar profile-top-bar pp-top-bar-inner"><div class="pp-top-bar-left profile-top-box-flex-inner"><a class="profile-top-bar-logo-box"><h2 class="pp-top-bar-logo-name profile-top-bar-logo-name">janitor</h2><p class="pp-top-bar-logo-sub-name profile-top-bar-logo-sub-name">beta</p></a><div class="profile-top-bar-search-wrapper"><div class="profile-top-bar-search-box pp-top-bar-search-input-group profile-top-bar-search-input-group"><span class="pp-top-bar-search-icon profile-top-bar-search-icon">⌕</span><input class="pp-top-bar-search profile-top-bar-search pp-top-bar-search-input profile-top-bar-search-input" placeholder="Search for characters or creators"></div></div></div><div class="pp-top-bar-right"><a class="pp-top-bar-create-char profile-top-bar-create-char">Create a Character</a><button class="top-icon pp-top-bar-notifications-button profile-top-bar-notifications-button" aria-label="Notifications"><span class="pp-top-bar-notifications-icon profile-top-bar-notifications-icon">◇</span></button><button class="top-icon pp-top-bar-app-menu" aria-label="App menu">T</button></div></div></header>
<main class="chakra-stack profile-page-container"><div class="pp-page-background profile-page-background"></div><div class="profile-page-flex">
<aside class="pp-uc-background profile-uc-background profile-uc-background-flex"><div class="profile-background-box-1"></div><div class="profile-background-box-2"></div><div class="profile-background-box-3"></div><div class="profile-info-wrapper-box"><div class="profile-info-stack"><div class="profile-info-hstack"><div class="pp-uc-avatar-container profile-avatar-container">${avatar}</div><div class="profile-info-stack-inner"><div class="profile-info-stack-inner-flex"><h1 class="pp-uc-title profile-title-heading">@${escapeHtml(username)}</h1></div><div class="pp-uc-followers-count profile-followers-count">${escapeHtml(profile.followers||"0")} followers</div><div class="pp-uc-member-since profile-member-since-box">Preview data only</div></div></div><div class="pp-uc-about-me profile-about-me">${profileHtml}</div><div class="pp-uc-follow-flex profile-uc-follow-flex"><button class="Btn pp-uc-follow-button profile-uc-follow-button"><span class="pp-uc-follow-text profile-uc-follow-text">${escapeHtml(c.followLabel||"Follow")}</span></button><button class="pp-uc-options-menu profile-uc-options-menu"><span>Options</span></button></div></div></div></aside>
<section class="profile-page-container-flex-box"><div class="profile-tabs-chakra-tabs">
  <div class="pp-tabs-wrapper profile-tabs-wrapper"><button class="pp-tabs-button profile-tabs-button" aria-selected="true">Characters</button><i class="pp-tabs-indicator profile-tabs-indicator"></i></div>
  <div class="pp-tabs-panels profile-tabs-panels"><div class="profile-tab-panel"><div class="characters-list-container-flex">
    <div class="character-list-pagination-flex">
      <div class="character-list-pagination-box"><div class="profile-pagination-flex-outer"><span class="pp-pg-total profile-badge-flex-outer">${countLabel}</span></div></div>
      <div class="css-zdpt2t"><div class="profile-filters-flex-outer"><div class="profile-filters-flex-inner-hassearchfilter profile-character-search-input-group"><input class="pp-fl-search-input profile-character-search-input" placeholder="Search for characters"></div><button class="pp-fl-filter-button profile-filter-button">▽</button><div class="profile-filters-flex-inner-onorderchanged"><button class="transparent sort-control">Latest⌄</button></div></div></div>
    </div>
    <div class="pp-cc-list-container profile-character-card-list-container">${cardArea}</div>
    <div class="profile-pagination-flex-outer preview-pagination-bottom"><span>1 / 1</span></div>
  </div></div></div>
</div></section></div></main>
<footer class="pp-footer"><span><b>janitor</b> — local styling preview</span><span class="footer-links"><a>careers</a><a>news</a><a>status</a><a>guidelines</a><a>safety</a><a>terms</a><a>support</a></span></footer>
</body></html>`;
}

const cleanPreviewMarkup=(value:string)=>value
  .replace(/<script\b[\s\S]*?<\/script>/gi,"")
  .replace(/\son\w+\s*=\s*(["']).*?\1/gi,"")
  .replace(/javascript:/gi,"");
