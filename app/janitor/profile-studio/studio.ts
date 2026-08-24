export type LayoutMode = "left" | "right" | "stack";
export type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "none";
export type ClipShape = "none" | "circle" | "diamond" | "hexagon";
export type CharacterSection = "tabs" | "count" | "filters" | "cards";
export type ProfileSection = "identity" | "about" | "widgets" | "follow";

export type StudioConfig = {
  pageColor: string; pageImage: string; pageSize: "cover" | "contain" | "auto"; pagePosition: string;
  pageRepeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y"; pageAttachment: "scroll" | "fixed"; pageBlend: string;
  pageBlur: number; pageBrightness: number; pageContrast: number; pageSaturate: number;
  overlayColor: string; overlayOpacity: number; overlayImage: string; overlayImageOpacity: number; vignette: number;
  maxWidth: number; layout: LayoutMode; layoutGap: number; profileWidth: number; profileSticky: boolean;
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
  headerHeight: number; headerBlur: number; hideHeader: boolean;
  tabColor: string; tabTextColor: string; tabActiveColor: string;
  controlColor: string; controlTextColor: string; controlBorderColor: string; controlRadius: number; controlGlow: number;
  followLabel: string; hideFollowers: boolean; hideMemberSince: boolean; hideSearch: boolean; hideAbout: boolean;
  footerColor: string; footerTextColor: string; hideFooter: boolean;
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
export type Widgets = { links: LinkButton[]; imageButtons: ImageButton[]; dolls: PageDoll[]; details: DetailBlock[]; assets: ImageAsset[]; experiences: HostedExperience[] };
export type Diagnostic = { level: "error" | "warning" | "info"; message: string };

export const defaults: StudioConfig = {
  pageColor: "#303136", pageImage: "", pageSize: "cover", pagePosition: "center center", pageRepeat: "no-repeat", pageAttachment: "fixed", pageBlend: "normal",
  pageBlur: 0, pageBrightness: 100, pageContrast: 100, pageSaturate: 100,
  overlayColor: "#000000", overlayOpacity: 12, overlayImage: "", overlayImageOpacity: 20, vignette: 28,
  maxWidth: 1740, layout: "left", layoutGap: 30, profileWidth: 540, profileSticky: false,
  characterOrder: ["tabs","count","filters","cards"], profileOrder: ["identity","about","widgets","follow"],
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
  headerHeight: 58, headerBlur: 0, hideHeader: false,
  tabColor: "#15161b", tabTextColor: "#30dce3", tabActiveColor: "#30dce3",
  controlColor: "#24252a", controlTextColor: "#eeeeef", controlBorderColor: "#65666d", controlRadius: 8, controlGlow: 0,
  followLabel: "Follow", hideFollowers: false, hideMemberSince: false, hideSearch: false, hideAbout: false,
  footerColor: "#17171a", footerTextColor: "#aaa5ad", hideFooter: false,
  breakpoint: 700, mobileCardWidth: 190, mobilePadding: 12, hideOverlayMobile: true,
  imageFilterAll: "none", imageHoverRestoreAll: false, selectionColor: "#d763dd", scrollbarColor: "#d763dd",
  customCss: "",
};

export const emptyWidgets: Widgets = { links: [], imageButtons: [], dolls: [], details: [], assets: [], experiences: [] };

export const presets: Record<string, Partial<StudioConfig>> = {
  Janitor: {},
  Scarlet: { pageColor:"#080305", profileColor:"#3b0b14", profileGradientTo:"#090305", profileGradient:true, cardColor:"#0d0407", cardGradientTo:"#260711", cardGradient:true, titleColor:"#fff6f7", bodyColor:"#eee1e4", mutedColor:"#bba3a9", linkColor:"#ef7382", linkHoverColor:"#ffffff", profileBorderColor:"#b53246", cardBorderColor:"#a93244", headerColor:"#4b0a16", headerGradientTo:"#16040a", headerGradient:true, headerBorderColor:"#9b1a30", tabColor:"#300912", tabTextColor:"#f38b98", tabActiveColor:"#ff6d7e", controlColor:"#1b070c", controlBorderColor:"#9e3040", ribbonColor:"#a21d32", tagColor:"#270812", tagBorderColor:"#8d3040", avatarGlow:18, titleGlow:15, profileGlow:18, cardHoverGlow:28 },
  Velvet: { pageColor:"#120d17", profileColor:"#211429", profileGradientTo:"#100b14", profileGradient:true, cardColor:"#2c1935", cardGradientTo:"#160e1d", cardGradient:true, titleColor:"#fff4fb", bodyColor:"#f7eaf2", mutedColor:"#c9afc7", linkColor:"#ed8fc8", linkHoverColor:"#ffffff", profileBorderColor:"#7b416d", cardBorderColor:"#7b416d", headerColor:"#2b162b", headerGradientTo:"#140c17", headerGradient:true, tabTextColor:"#ed8fc8", tabActiveColor:"#ffb9e2", controlColor:"#28162c", controlBorderColor:"#754168", ribbonColor:"#a24b85", tagColor:"#321c38", tagBorderColor:"#754168", profileRadius:18, cardRadius:18, controlRadius:12, avatarRadius:50, profileGlass:8 },
  Frost: { pageColor:"#0d141c", profileColor:"#172637", profileGradientTo:"#0f1924", profileGradient:true, cardColor:"#172232", cardGradientTo:"#0d1621", cardGradient:true, titleColor:"#f2fbff", bodyColor:"#e8f6ff", mutedColor:"#9eb4c6", linkColor:"#62dbff", linkHoverColor:"#ffffff", profileBorderColor:"#315a72", cardBorderColor:"#315a72", headerColor:"#122333", headerGradientTo:"#0a1119", headerGradient:true, tabTextColor:"#62dbff", tabActiveColor:"#b7f2ff", controlColor:"#112231", controlBorderColor:"#315a72", ribbonColor:"#178bb5", tagColor:"#173044", tagBorderColor:"#39718e", avatarGlow:15, profileGlass:10 },
  Cyber: { pageColor:"#05060a", profileColor:"#0b1020", profileGradientTo:"#120b22", profileGradient:true, cardColor:"#090e1a", cardGradientTo:"#180d27", cardGradient:true, titleColor:"#e9fbff", bodyColor:"#d8f8ff", mutedColor:"#8293ad", linkColor:"#00f0ff", linkHoverColor:"#f500ff", profileBorderColor:"#00b8c7", cardBorderColor:"#9e22d8", headerColor:"#080b17", headerGradientTo:"#180925", headerGradient:true, tabTextColor:"#00f0ff", tabActiveColor:"#f500ff", controlColor:"#0a1020", controlBorderColor:"#7540a5", ribbonColor:"#d000ff", tagColor:"#11172b", tagBorderColor:"#00a7b4", titleGlow:22, profileGlow:18, cardHoverGlow:32, avatarClip:"hexagon" },
  Paper: { pageColor:"#e9e0d0", profileColor:"#fff8e9", profileGradientTo:"#ede1cb", profileGradient:true, cardColor:"#f8edda", cardGradientTo:"#e8d8bd", cardGradient:true, titleColor:"#2e261e", bodyColor:"#302820", mutedColor:"#766757", linkColor:"#a43f35", linkHoverColor:"#6f251e", profileBorderColor:"#aa9274", cardBorderColor:"#aa9274", headerColor:"#3b3027", headerGradientTo:"#211a15", headerGradient:true, headerTextColor:"#fff8ec", tabColor:"#3b3027", tabTextColor:"#f4d3a4", tabActiveColor:"#ffffff", controlColor:"#fff8e9", controlTextColor:"#2e261e", controlBorderColor:"#aa9274", ribbonColor:"#8e392e", tagColor:"#e7d6ba", tagTextColor:"#382d23", tagBorderColor:"#aa9274", profileRadius:2, cardRadius:2, controlRadius:2, titleFont:"Georgia", bodyFont:"Georgia" },
};

const safeUrl = (value: string) => value.replace(/["'\\\n\r<>]/g, "");
const safeText = (value: string) => value.replace(/["\\\n\r]/g, "");
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]!));
const rgba = (hex: string, percent: number) => {
  const value = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) return hex;
  const n = Number.parseInt(value, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${(percent / 100).toFixed(2)})`;
};
const background = (solid:string, to:string, gradient:boolean, image:string) => image
  ? `linear-gradient(${rgba(solid,82)}, ${rgba(to,90)}), url("${safeUrl(image)}")`
  : gradient ? `linear-gradient(145deg, ${solid}, ${to})` : solid;
const clip = (shape: ClipShape) => ({ none:"none", circle:"circle(50%)", diamond:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", hexagon:"polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)" }[shape]);
const shadow = (depth:number, glow:number, color:string) => `0 ${Math.max(2,Math.round(depth/3))}px ${depth}px rgba(0,0,0,0.58)${glow ? `, 0 0 ${glow}px ${rgba(color,45)}` : ""}`;

export function ensureWrapped(source:string){
  const body = source.replace(/^\s*<style[^>]*>\s*/i, "").replace(/\s*<\/style>\s*$/i, "").trim();
  return `<style>\n${body}\n</style>`;
}
export function unwrap(source:string){ return source.replace(/^\s*<style[^>]*>\s*/i, "").replace(/\s*<\/style>\s*$/i, ""); }

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

export function generateCss(c:StudioConfig, widgets:Widgets){
  const dir = c.layout === "right" ? "row-reverse" : c.layout === "stack" ? "column" : "row";
  const characterOrder = Object.fromEntries(c.characterOrder.map((name,index)=>[name,index+1]));
  const profileOrder = Object.fromEntries(c.profileOrder.map((name,index)=>[name,index+1]));
  const profileBackground = background(c.profileColor,c.profileGradientTo,c.profileGradient,c.profileImage);
  const cardBackground = background(c.cardColor,c.cardGradientTo,c.cardGradient,c.cardImage);
  const pageFilter = `blur(${c.pageBlur}px) brightness(${c.pageBrightness}%) contrast(${c.pageContrast}%) saturate(${c.pageSaturate}%)`;
  const rules:string[] = [];
  rules.push(`/* Janitor Profile Studio — validator-safe semantic selectors */`);
  rules.push(`.pp-page-background, .profile-page-background {
  background-color: ${c.pageColor} !important;${c.pageImage ? `\n  background-image: url("${safeUrl(c.pageImage)}") !important;` : ""}
  background-size: ${c.pageSize} !important; background-position: ${safeText(c.pagePosition)} !important; background-repeat: ${c.pageRepeat} !important;
  background-attachment: ${c.pageAttachment} !important; background-blend-mode: ${c.pageBlend} !important;
  filter: ${pageFilter} !important; -webkit-filter: ${pageFilter} !important;${c.pageBlur ? `\n  transform: scale(1.03) !important;` : ""}
}`);
  if(c.overlayOpacity || c.vignette) rules.push(`.pp-page-background::after, .profile-page-background::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 45%, ${rgba("#000000",c.vignette)} 100%), ${rgba(c.overlayColor,c.overlayOpacity)} !important;
}`);
  if(c.overlayImage) rules.push(`.profile-page-container::after {
  content: ""; position: fixed; inset: 0; z-index: 20; pointer-events: none;
  background-image: url("${safeUrl(c.overlayImage)}"); background-size: cover; background-position: center; background-repeat: no-repeat; opacity: ${(c.overlayImageOpacity/100).toFixed(2)};
}`);
  rules.push(`.profile-page-container { max-width: ${c.maxWidth}px !important; margin-left: auto !important; margin-right: auto !important; }`);
  rules.push(`.profile-page-flex { display: flex !important; flex-direction: ${dir} !important; gap: ${c.layoutGap}px !important; align-items: flex-start !important; }`);
  rules.push(`.pp-uc-background, .profile-uc-background, .profile-uc-background-flex {
  width: ${c.profileWidth}px !important; min-width: ${c.profileWidth}px !important; max-width: ${c.profileWidth}px !important; flex-basis: ${c.profileWidth}px !important;
  padding: ${c.profilePadding}px !important; background: ${profileBackground} !important; background-size: cover !important; background-position: center !important;
  border: ${c.profileBorderWidth}px ${c.profileBorderStyle} ${c.profileBorderColor} !important; border-radius: ${c.profileRadius}px !important;
  box-shadow: ${shadow(c.profileShadow,c.profileGlow,c.profileBorderColor)} !important; opacity: ${(c.profileOpacity/100).toFixed(2)} !important;
  min-height: ${c.profileMinHeight}px !important; text-align: ${c.profileAlign} !important;${c.profileGlass ? `\n  backdrop-filter: blur(${c.profileGlass}px); -webkit-backdrop-filter: blur(${c.profileGlass}px);` : ""}${c.profileSticky ? `\n  position: sticky !important; top: ${c.headerHeight + 16}px !important;` : ""}
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
  rules.push(`.profile-info-wrapper-box > .profile-info-stack { display: flex !important; flex-direction: column !important; } .profile-info-wrapper-box > .profile-info-stack > .profile-info-hstack { order: ${profileOrder.identity} !important; } .profile-info-wrapper-box > .profile-info-stack > .profile-about-me, .profile-info-wrapper-box > .profile-info-stack > .pp-uc-about-me { order: ${Math.min(profileOrder.about,profileOrder.widgets)} !important; } .profile-info-wrapper-box > .profile-info-stack > .pp-uc-follow-button, .profile-info-wrapper-box > .profile-info-stack > .profile-uc-follow-button { order: ${profileOrder.follow} !important; }`);
  rules.push(`.pp-uc-followers-count, .profile-followers-count, .pp-uc-member-since, .profile-member-since-box { color: ${c.mutedColor} !important; }`);
  rules.push(`.profile-character-card-creator-name-link, .profile-character-card-creator-name-box { color: ${c.linkColor} !important; } .profile-character-card-creator-name-link:hover { color: ${c.linkHoverColor} !important; }`);
  rules.push(`.profile-tabs-chakra-tabs { display: flex !important; flex-direction: column !important; } .profile-tabs-wrapper { order: ${characterOrder.tabs} !important; } .profile-badge-flex-outer { order: ${characterOrder.count} !important; } .profile-filters-flex-outer { order: ${characterOrder.filters} !important; } .pp-cc-list-container, .card-row { order: ${characterOrder.cards} !important; display: flex !important; flex-wrap: wrap !important; gap: ${c.cardGap}px !important; justify-content: ${c.cardJustify} !important; }`);
  rules.push(`.pp-cc-wrapper, .profile-character-card-wrapper {
  width: ${c.cardWidth}px !important; min-width: ${c.cardWidth}px !important; max-width: ${c.cardWidth}px !important; flex-basis: ${c.cardWidth}px !important;
  min-height: ${c.cardMinHeight}px !important; overflow: hidden !important; border: ${c.cardBorderWidth}px ${c.cardBorderStyle} ${c.cardBorderColor} !important;
  border-radius: ${c.cardRadius}px !important; background: ${cardBackground} !important; background-size: cover !important; background-position: center !important;
  box-shadow: ${shadow(c.cardShadow,0,c.cardBorderColor)} !important; opacity: ${(c.cardOpacity/100).toFixed(2)} !important; transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease !important;
}`);
  rules.push(`.profile-character-card-stack { background: transparent !important; color: ${c.bodyColor} !important; border-radius: ${c.cardRadius}px !important; }`);
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
  rules.push(`.profile-character-card-ribbon, .css-wexxj8 { background: ${c.ribbonColor} !important; } .pp-cc-star, .profile-character-card-star { filter: ${c.starFilter} !important; -webkit-filter: ${c.starFilter} !important; }`);
  rules.push(`.profile-top-bar-flex-outer, .pp-top-bar-outer {
  min-height: ${c.headerHeight}px !important; color: ${c.headerTextColor} !important; background: ${c.headerGradient ? `linear-gradient(180deg, ${c.headerColor}, ${c.headerGradientTo})` : c.headerColor} !important;
  border-bottom: 1px solid ${c.headerBorderColor} !important;${c.headerBlur ? `\n  backdrop-filter: blur(${c.headerBlur}px); -webkit-backdrop-filter: blur(${c.headerBlur}px);` : ""}
}`);
  rules.push(`.pp-tabs-wrapper, .profile-tabs-wrapper { background: ${c.tabColor} !important; border-color: ${c.tabActiveColor} !important; } .pp-tabs-button, .profile-tabs-button { color: ${c.tabTextColor} !important; background: ${c.tabColor} !important; } .pp-tabs-button[aria-selected="true"], .profile-tabs-button[aria-selected="true"] { color: ${c.tabActiveColor} !important; } .profile-tabs-indicator { background: ${c.tabActiveColor} !important; }`);
  rules.push(`.pp-fl-search-input, .profile-character-search-input, .pp-fl-filter-button, .profile-filter-button, .transparent .react-select__control {
  color: ${c.controlTextColor} !important; background: ${c.controlColor} !important; border: 1px solid ${c.controlBorderColor} !important; border-radius: ${c.controlRadius}px !important;
}`);
  rules.push(`.Btn, .Btn2, .Btn2-purple, .pp-uc-follow-button, .profile-uc-follow-button, .pressable-button, .jps-link-button {
  color: ${c.controlTextColor} !important; background: ${c.controlColor} !important; border: 1px solid ${c.controlBorderColor} !important;
  border-radius: ${c.controlRadius}px !important; text-decoration: none !important; box-shadow: ${c.controlGlow ? `0 0 ${c.controlGlow}px ${rgba(c.controlBorderColor,55)}` : "none"} !important;
}`);
  if(c.followLabel !== "Follow") rules.push(`.pp-uc-follow-text, .profile-uc-follow-text { font-size: 0 !important; } .pp-uc-follow-text::after, .profile-uc-follow-text::after { content: "${safeText(c.followLabel)}"; font-size: ${c.bodySize}px; }`);
  rules.push(`footer { color: ${c.footerTextColor} !important; background: ${c.footerColor} !important; }`);
  if(c.imageFilterAll !== "none") rules.push(`.profile-page-container img { filter: ${c.imageFilterAll}; -webkit-filter: ${c.imageFilterAll}; transition: filter .2s ease; }${c.imageHoverRestoreAll ? ` .profile-page-container img:hover { filter: none; -webkit-filter: none; }` : ""}`);
  if(c.hideStar) rules.push(`.pp-cc-star, .profile-character-card-star { visibility: hidden !important; }`);
  if(c.hideTokens) rules.push(`.pp-cc-tokens-count, .profile-character-card-tokens-count { display: none !important; }`);
  if(c.hideTags) rules.push(`.pp-cc-tags, .profile-character-card-tags { display: none !important; }`);
  if(c.hideCreator) rules.push(`.pp-cc-creator-name, .profile-character-card-creator-name-box, .profile-character-card-creator-name-link { display: none !important; }`);
  if(c.hideDescription) rules.push(`.css-96l1id, .pp-cc-description, .profile-character-card-description-box, .profile-character-card-description-markdown-container { display: none !important; }`);
  if(c.hideRibbon) rules.push(`.profile-character-card-ribbon, .css-wexxj8 { display: none !important; }`);
  if(c.hideFollowers) rules.push(`.pp-uc-followers-count, .profile-followers-count { display: none !important; }`);
  if(c.hideMemberSince) rules.push(`.pp-uc-member-since, .profile-member-since-box { display: none !important; }`);
  if(c.hideAbout) rules.push(`.profile-about-me, .pp-uc-about-me { display: none !important; }`);
  if(c.hideSearch) rules.push(`.profile-filters-flex-inner-hassearchfilter, .profile-character-search-input-group { display: none !important; }`);
  if(c.hideHeader) rules.push(`.profile-top-bar-flex-outer, .pp-top-bar-outer { display: none !important; }`);
  if(c.hideFooter) rules.push(`footer { display: none !important; }`);
  rules.push(`.profile-page-container ::selection { background: ${c.selectionColor}; color: ${c.bodyColor}; } .profile-page-container * { scrollbar-color: ${c.scrollbarColor} transparent; }`);
  if(c.profileAnimation !== "none") rules.push(`@keyframes jps-profile-${c.profileAnimation} { 0%,100% { transform: ${c.profileAnimation === "float" ? "translateY(0)" : "scale(1)"}; } 50% { transform: ${c.profileAnimation === "float" ? "translateY(-6px)" : "scale(1.015)"}; } } .pp-uc-background, .profile-uc-background { animation: jps-profile-${c.profileAnimation} ${c.profileAnimation === "float" ? "4s" : "3s"} ease-in-out infinite; }`);
  if(c.cardAnimation !== "none") rules.push(`@keyframes jps-card-${c.cardAnimation} { from { opacity: 0; transform: ${c.cardAnimation === "rise" ? "translateY(18px)" : "none"}; } to { opacity: ${(c.cardOpacity/100).toFixed(2)}; transform: none; } } .pp-cc-wrapper, .profile-character-card-wrapper { animation: jps-card-${c.cardAnimation} .45s ease both; }`);
  if(c.profileAnimation !== "none" || c.cardAnimation !== "none") rules.push(`@media (prefers-reduced-motion: reduce) { .pp-uc-background, .profile-uc-background, .pp-cc-wrapper, .profile-character-card-wrapper { animation: none !important; } }`);
  if(widgets.links.length) rules.push(`.jps-links { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; } .jps-link-button { display: inline-block; padding: 10px 16px; font-weight: 700; }`);
  if(widgets.imageButtons.length) rules.push(`.jps-image-buttons { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; } .jps-image-button img { height: auto; transition: transform .2s ease; } .jps-image-button:hover img { transform: translateY(-2px); }`);
  if(widgets.details.length) rules.push(`.jps-details { margin: 10px 0; border: 1px solid ${c.controlBorderColor}; border-radius: ${c.controlRadius}px; overflow: hidden; } .jps-details summary { cursor: pointer; padding: 10px 12px; color: ${c.controlTextColor}; background: ${c.controlColor}; font-weight: 700; } .jps-details p { padding: 10px 12px; margin: 0; color: ${c.bodyColor}; }`);
  if(widgets.experiences.length) rules.push(`.jps-experiences { display: grid; gap: 10px; margin: 12px 0; } .jps-experience { position: relative; display: grid; grid-template-columns: auto 1fr; gap: 4px 11px; padding: 13px 14px; overflow: hidden; color: ${c.bodyColor} !important; background: ${c.controlColor}; border: 1px solid ${c.controlBorderColor}; border-radius: ${c.controlRadius}px; text-decoration: none !important; box-shadow: ${c.controlGlow ? `0 0 ${c.controlGlow}px ${rgba(c.controlBorderColor,45)}` : "none"}; transition: transform .2s ease, border-color .2s ease; } .jps-experience:hover { transform: translateY(-2px); border-color: ${c.linkHoverColor}; } .jps-experience-kind { grid-row: 1 / 4; align-self: start; min-width: 42px; padding: 6px 7px; color: ${c.controlTextColor}; background: ${c.tabActiveColor}; border-radius: ${Math.max(4,Math.round(c.controlRadius/2))}px; font-size: 8px; font-weight: 800; letter-spacing: 1px; text-align: center; text-transform: uppercase; } .jps-experience strong { color: ${c.linkColor}; font-size: 14px; } .jps-experience p { margin: 0; color: ${c.mutedColor}; font-size: 11px; line-height: 1.45; } .jps-experience b { color: ${c.linkHoverColor}; font-size: 9px; letter-spacing: .8px; text-transform: uppercase; }`);
  widgets.dolls.forEach((d,i)=>rules.push(`.jps-page-doll-${i+1} { position: fixed; ${d.side}: 10px; bottom: ${d.bottom}px; z-index: 1000; pointer-events: none; } .jps-page-doll-${i+1} img { width: ${d.width}px; max-width: 100%; height: auto; }`));
  rules.push(`@media only screen and (max-width: ${c.breakpoint}px) {
  .profile-page-container { padding-left: ${c.mobilePadding}px !important; padding-right: ${c.mobilePadding}px !important; }
  .profile-page-flex { flex-direction: column !important; gap: ${Math.max(10,Math.round(c.layoutGap*.65))}px !important; }
  .pp-uc-background, .profile-uc-background, .profile-uc-background-flex { width: 100% !important; min-width: 0 !important; max-width: 100% !important; flex-basis: auto !important; position: relative !important; top: auto !important; }
  .pp-cc-wrapper, .profile-character-card-wrapper { width: ${c.mobileCardWidth}px !important; min-width: ${c.mobileCardWidth}px !important; max-width: 100% !important; flex-basis: ${c.mobileCardWidth}px !important; }${c.hideOverlayMobile ? `\n  .profile-page-container::after { display: none !important; }` : ""}
  ${widgets.dolls.map((d,i)=>d.hideMobile ? `.jps-page-doll-${i+1}` : "").filter(Boolean).join(", ")} ${widgets.dolls.some(d=>d.hideMobile) ? "{ display: none !important; }" : ""}
}`);
  if(c.customCss.trim()) rules.push(`/* Custom additions */\n${unwrap(c.customCss).trim()}`);
  return ensureWrapped(rules.join("\n\n"));
}

export function generateHtml(w:Widgets){
  const chunks:string[]=[];
  if(w.experiences.length) chunks.push(`<div class="jps-experiences">\n${w.experiences.map(x=>`  <a href="${escapeHtml(x.url)}" class="jps-experience jps-experience-${x.kind}" target="_blank" rel="noopener noreferrer nofollow"><span class="jps-experience-kind">${escapeHtml(x.kind)}</span><strong>${escapeHtml(x.title)}</strong><p>${escapeHtml(x.description)}</p><b>${escapeHtml(x.label)} →</b></a>`).join("\n")}\n</div>`);
  if(w.links.length) chunks.push(`<div class="jps-links">\n${w.links.map(x=>`  <a href="${escapeHtml(x.url)}" class="jps-link-button" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(x.label)}</a>`).join("\n")}\n</div>`);
  if(w.imageButtons.length) chunks.push(`<div class="jps-image-buttons">\n${w.imageButtons.map(x=>`  <a href="${escapeHtml(x.url)}" class="jps-image-button" target="_blank" rel="noopener noreferrer nofollow"><img src="${escapeHtml(x.image)}" alt="${escapeHtml(x.alt)}" style="width:${x.width}px"></a>`).join("\n")}\n</div>`);
  w.details.forEach(x=>chunks.push(`<details class="jps-details"${x.open?" open":""}>\n  <summary>${escapeHtml(x.summary)}</summary>\n  <p>${escapeHtml(x.content)}</p>\n</details>`));
  w.dolls.forEach((x,i)=>chunks.push(`<div class="jps-page-doll-${i+1}"><img src="${escapeHtml(x.image)}" alt="${escapeHtml(x.alt)}"></div>`));
  return chunks.join("\n\n");
}

export function inspectCss(source:string):Diagnostic[]{
  const s=source.trim(), body=unwrap(s), out:Diagnostic[]=[];
  if(!s.startsWith("<style>")) out.push({level:"error",message:"The snippet must start with <style>. Export will repair this automatically."});
  if(!s.endsWith("</style>")) out.push({level:"error",message:"The snippet must end with </style>. Export will repair this automatically."});
  if(/\b(?:min|max|clamp)\s*\(/i.test(body)) out.push({level:"error",message:"Janitor's validator may reject min(), max(), and clamp(). Use width plus max-width/min-width instead."});
  if(/(?:mask-image|-webkit-mask-image)\s*:\s*url\s*\(/i.test(body)) out.push({level:"error",message:"Janitor blocks URL-based masks. Gradient masks and clip-path basic shapes are safer."});
  if(/clip-path\s*:\s*url\s*\(/i.test(body)) out.push({level:"warning",message:"URL clip paths may be sanitized. Use circle(), inset(), ellipse(), or polygon()."});
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
  {status:"Works",items:["Solid colors and CSS gradients","HTTPS background images and GIFs","Filters and hover filters","Gradient mask-image fades","clip-path basic shapes","Media queries","Text and box shadows","Pseudo-element text","HTML links, image buttons, details and page dolls"]},
  {status:"Risky",items:["Generated .css-xxxxx selectors","@import and remote fonts","content: url() replacements","Broad html/body/header/a/button rules","Heavy blur and fixed overlays on mobile","New CSS functions accepted by browsers but rejected by Janitor's editor"]},
  {status:"Blocked",items:["JavaScript in profile content","file:// image paths","URL-based image masks","Some star/icon image replacements","CSS that escapes Janitor's sanitizer"]},
];

const PREVIEW_BASE=`*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#303136;font-family:Arial;color:#eee}body{position:relative;font-size:14px;min-height:760px}.profile-top-bar-flex-outer{height:58px;background:#38393f;display:flex;align-items:center;gap:24px;padding:0 3%;position:relative;z-index:30}.profile-top-bar-flex-outer b{font-size:25px;letter-spacing:2px}.profile-top-bar-flex-outer a{color:#ef82ed;text-decoration:none}.profile-top-bar-flex-outer small{font-size:11px}.profile-top-bar-flex-outer input{flex:1;max-width:760px;margin:auto;background:#505158;border:0;border-radius:10px;padding:11px 15px;color:white}.profile-top-bar-flex-outer span{font-size:12px;color:#ccc}.profile-page-container{position:relative;min-height:657px;padding:24px 2.5% 70px;max-width:1740px}.profile-page-background{position:fixed;inset:58px 0 45px;z-index:0;background:linear-gradient(115deg,#292a2f,#3c3d43);background-size:cover;background-position:center}.profile-page-flex{position:relative;z-index:2;display:flex;gap:30px}.profile-uc-background{position:relative;overflow:hidden;padding:12px;background:#292a2f;border-radius:8px;width:540px;min-width:540px}.profile-background-box-1,.profile-background-box-2,.profile-background-box-3{position:absolute;inset:0;pointer-events:none}.profile-background-box-1{background:linear-gradient(140deg,#555,#252525)}.profile-background-box-2{background:#0008}.profile-background-box-3{background:linear-gradient(180deg,transparent,#0005)}.profile-info-wrapper-box{position:relative}.profile-info-stack{display:flex;flex-direction:column;gap:10px}.profile-info-hstack{display:flex;gap:10px;align-items:center}.profile-avatar{width:150px;height:150px;background:linear-gradient(135deg,#522332,#121217);display:grid;place-items:center;font-size:48px}.profile-title-heading{margin:8px 0;font-size:27px}.profile-followers-count,.profile-member-since-box{font-weight:bold;font-size:13px}.profile-about-me{color:#bbb;min-height:35px}.profile-uc-follow-button{padding:10px;width:100%}.profile-page-container-flex-box{flex:1;min-width:0;position:relative}.profile-tabs-chakra-tabs{display:flex;flex-direction:column;gap:16px}.profile-tabs-wrapper{width:max-content;border-bottom:2px solid #31dce3}.profile-tabs-button{background:#15161b;color:#30dce3;border:0;padding:12px 20px}.profile-filters-flex-outer{display:flex;justify-content:flex-end;gap:8px}.profile-filters-flex-outer input{padding:11px 14px;background:transparent;border:1px solid #65666d;border-radius:8px;color:white;min-width:230px}.profile-filters-flex-outer button{background:transparent;border:1px solid #65666d;color:#eee;border-radius:8px;padding:0 16px}.card-row{display:flex;flex-wrap:wrap;gap:14px}.profile-character-card-wrapper{width:190px;min-width:190px;min-height:510px;background:#1d1e24;border:1px solid #7560a0;border-radius:8px;overflow:hidden}.profile-character-card-name-box{height:36px;padding:10px 9px;color:#e57be8;font-size:11px;white-space:nowrap;overflow:hidden}.profile-character-card-avatar-image{height:185px;background:radial-gradient(circle at 50% 35%,#a53b1f 0 4%,#160904 20%,#030303 63%);display:grid;place-items:center;color:#8f6e65;font-size:10px}.card-copy{padding:10px;color:#ddd}.profile-character-card-creator-name-link{color:#b69cff}.card-copy i{display:block;color:#ff7b46;text-align:center;font-size:11px;line-height:1.5;margin:10px 0}.profile-character-card-star-line{text-align:right;border-bottom:1px solid #b69cff;padding:8px;color:#dccaff}.card-tags{display:flex;flex-wrap:wrap;gap:5px;padding-top:12px}.card-tags b{font-size:10px;border:1px solid #77649e;border-radius:6px;padding:3px 7px}.profile-character-card-tokens-count{text-align:center;font-size:10px;margin-top:8px}footer{height:45px;background:#17171acc;position:absolute;z-index:20;bottom:0;left:0;right:0;padding:15px 18%;font-size:11px}footer span{float:right;color:#a88aff}@media(max-width:850px){.profile-page-flex{flex-direction:column}.profile-uc-background{width:100%;min-width:0}.profile-top-bar-flex-outer span{display:none}}`;

export function previewDocument(css:string,c:StudioConfig,w:Widgets){
  const html=generateHtml(w);
  const cards=[["SOUL OF CINDER","The First Flame gutters at the end of the world…"],["VESPER","Your mysterious neighbor never sleeps."],["MORROW","The old cathedral keeps one final secret."]].map((x,i)=>`<article class="pp-cc-wrapper profile-character-card-wrapper"><div class="profile-character-card-stack"><div class="profile-character-card-name-box">${x[0]}</div><div class="pp-cc-avatar profile-character-card-avatar-image art-${i}"><span>BOT IMAGE</span></div><div class="card-copy"><a class="profile-character-card-creator-name-link">@Patches</a><i>${x[1]}</i><div class="pp-cc-star-line profile-character-card-star-line"><span class="pp-cc-star profile-character-card-star">✦</span></div><div class="pp-cc-tags profile-character-card-tags card-tags"><b class="pp-cc-tags-item profile-character-card-tags-item">Limitless</b><b class="pp-cc-tags-item profile-character-card-tags-item">Fictional</b><b class="pp-cc-tags-item profile-character-card-tags-item">Game</b><b class="pp-cc-tags-item profile-character-card-tags-item">Magical</b></div><div class="pp-cc-tokens-count profile-character-card-tokens-count">5.8k tokens</div></div></div></article>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>${PREVIEW_BASE}</style><style>${unwrap(css)}</style></head><body><header class="profile-top-bar-flex-outer pp-top-bar-outer"><b><a href="/">janitor<small> beta</small></a></b><input class="pp-top-bar-search profile-top-bar-search pp-top-bar-search-input" placeholder="Search for characters or creators…"><span class="pp-top-bar-create-char profile-top-bar-create-char">Create a Character ♧ ●</span></header><main class="profile-page-container"><div class="pp-page-background profile-page-background"></div><div class="profile-page-flex"><aside class="pp-uc-background profile-uc-background profile-uc-background-flex"><div class="profile-background-box-1"></div><div class="profile-background-box-2"></div><div class="profile-background-box-3"></div><div class="profile-info-wrapper-box"><div class="profile-info-stack"><div class="profile-info-hstack"><div class="pp-uc-avatar-container profile-avatar-container"><div class="pp-uc-avatar profile-avatar">P</div></div><div class="profile-info-stack-inner"><h1 class="pp-uc-title profile-title-heading">@Patches</h1><p class="pp-uc-followers-count profile-followers-count">0 followers</p><p class="pp-uc-member-since profile-member-since-box">Member Since May 9, 2026</p></div></div><p class="pp-uc-about-me profile-about-me">A profile for stories, strange characters, and experiments.</p>${html}<button class="Btn pp-uc-follow-button profile-uc-follow-button"><span class="pp-uc-follow-text profile-uc-follow-text">Follow</span></button></div></div></aside><section class="profile-page-container-flex-box"><div class="profile-tabs-chakra-tabs"><div class="pp-tabs-wrapper profile-tabs-wrapper"><button class="pp-tabs-button profile-tabs-button" aria-selected="true">CHARACTERS</button><i class="profile-tabs-indicator"></i></div><div class="profile-badge-flex-outer">3 characters</div><div class="profile-filters-flex-outer"><div class="profile-filters-flex-inner-hassearchfilter"><input class="pp-fl-search-input profile-character-search-input" placeholder="Search for characters…"></div><button class="pp-fl-filter-button profile-filter-button">▽</button><button class="transparent">Latest⌄</button></div><div class="card-row">${cards}</div></div></section></div></main><footer>janitor — Build, share, and explore! <span>careers · news · status · guidelines · safety · terms · support</span></footer></body></html>`;
}

export type ImportedProfileSource = {
  css: string;
  html: string;
  kind: "janitor-page" | "profile-source";
};

export function assembleProfileSource(css:string, html:string){
  return `${ensureWrapped(css).trim()}${html.trim() ? `\n\n${html.trim()}` : ""}`;
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
    const block=source.match(/<(?:div|p)[^>]*class=["'][^"']*(?:pp-uc-about-me|profile-about-me)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p)>/i);
    if(!block) throw new Error("No editable About Me source was found in that saved page.");
    source=block[1];kind="janitor-page";
  }
  const styles=[...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)];
  const css=styles.length?ensureWrapped(styles.map(match=>match[1]).join("\n\n")):ensureWrapped("");
  const html=source.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"").trim();
  return {css,html,kind};
}

const REAL_PREVIEW_BASE=`
*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Arial,sans-serif;color:#f5f5f7;background:#25262b}body{position:relative;font-size:14px}.profile-top-bar-flex-outer{position:relative;z-index:30;height:64px;display:flex;align-items:center;padding:0 3.2%;background:#34353b;border-bottom:1px solid #45464d}.pp-top-bar{width:100%;display:flex;align-items:center;justify-content:space-between;gap:22px}.pp-top-bar-left{min-width:0;flex:1;display:flex;align-items:center;gap:24px}.profile-top-bar-logo-box{display:flex;align-items:flex-end;color:#f78af0;text-decoration:none}.profile-top-bar-logo-name{margin:0;font-size:25px;line-height:1;letter-spacing:2px}.profile-top-bar-logo-sub-name{margin:0 0 1px 4px;font-size:10px;font-weight:900}.profile-top-bar-search-wrapper{min-width:120px;max-width:760px;flex:1}.profile-top-bar-search-box{height:38px;display:flex;align-items:center;gap:8px;padding:0 13px;color:#bebec4;background:#4b4c53;border-radius:8px}.profile-top-bar-search{color:#aaaab1}.pp-top-bar-right{display:flex;align-items:center;gap:15px}.profile-top-bar-create-char{padding:8px 12px;color:#e6e6e9;text-decoration:none;border:1px solid #66676f;border-radius:7px;font-size:12px}.top-icon{display:grid;place-items:center;width:31px;height:31px;color:#ddd;background:#494a50;border-radius:7px}
.profile-page-container{position:relative;z-index:1;width:100%;max-width:1680px;min-height:calc(100vh - 114px);margin:auto;padding:28px 3% 86px}.profile-page-background{position:fixed;z-index:0;inset:64px 0 50px;background:linear-gradient(120deg,#292a30,#3c3d43);background-position:center;background-size:cover}.profile-page-flex{position:relative;z-index:2;display:flex;align-items:flex-start;gap:30px}.profile-uc-background{position:relative;width:500px;min-width:360px;overflow:hidden;border:1px solid #666771;border-radius:8px;background:#2b2c31;box-shadow:0 12px 32px #0004}.profile-background-box-1,.profile-background-box-2,.profile-background-box-3{position:absolute;inset:0;pointer-events:none}.profile-background-box-1{background:linear-gradient(140deg,#9999a3,#33333de8 22%,#33333df2 88%,#9999a3)}.profile-background-box-2{background:linear-gradient(180deg,#1113,#1119)}.profile-background-box-3{background:radial-gradient(circle at 90% 10%,#af6eb029,transparent 40%)}.profile-info-wrapper-box{position:relative;padding:18px}.profile-info-stack{display:flex;flex-direction:column;gap:14px}.profile-info-hstack{display:flex;align-items:center;gap:18px}.profile-avatar-container{flex:none}.profile-avatar{display:block;width:150px;height:150px;object-fit:cover;border:2px solid #777883;border-radius:8px;background:linear-gradient(135deg,#492337,#17171b);box-shadow:0 8px 20px #0006}.profile-info-stack-inner{min-width:0;display:flex;flex:1;flex-direction:column;gap:8px}.profile-info-stack-inner-flex{min-width:0}.profile-title-heading{margin:0;overflow:hidden;color:white;font-size:28px;line-height:1.15;text-overflow:ellipsis}.profile-followers-count,.profile-member-since-box{color:white;font-weight:700;font-size:13px}.profile-about-me{width:100%;min-height:38px;color:#e1e1e5;line-height:1.55}.profile-about-me:empty{display:none}.profile-uc-follow-button{width:100%;padding:11px 16px;color:white;background:#9e3f8d;border:1px solid #d36cc0;border-radius:7px;font-weight:800}
.profile-page-container-flex-box{min-width:0;flex:1}.profile-tabs-chakra-tabs{display:flex;flex-direction:column;gap:18px}.profile-tabs-wrapper{position:relative;display:flex;width:max-content;max-width:100%;overflow-x:auto;border-bottom:1px solid #2dd4da;background:#15161b}.profile-tabs-button{min-width:100px;padding:10px 18px;color:#30dbe1;background:#15161b;border:0;font-weight:700;letter-spacing:1px;text-transform:uppercase}.profile-tabs-indicator{position:absolute;right:0;bottom:0;left:0;height:2px;background:#30dbe1;box-shadow:0 0 8px #30dbe1}.profile-tabs-panels,.profile-tab-panel{width:100%}.characters-list-container-flex{display:flex;flex-direction:column;gap:24px}.character-list-pagination-flex{display:flex;align-items:center;justify-content:space-between;gap:12px}.profile-badge-flex-outer{color:#c5c5ca;font-size:12px}.profile-filters-flex-outer{display:flex;justify-content:flex-end;gap:8px}.profile-character-search-input-group{min-width:230px}.profile-character-search-input,.profile-filter-button,.sort-control{height:38px;padding:0 13px;color:#ededf0;background:transparent;border:1px solid #666770;border-radius:8px}.profile-character-search-input{width:100%}.profile-filter-button{width:42px}.sort-control{min-width:95px}.pp-cc-list-container{display:flex;flex-wrap:wrap;align-items:stretch;gap:14px}
.profile-character-card-wrapper{position:relative;width:220px;min-width:220px;overflow:hidden;border:1px solid #765e9b;border-radius:8px;background:#111217;box-shadow:0 9px 24px #0005}.pp-cc-gradient-1,.pp-cc-gradient-2,.pp-cc-gradient-3{position:absolute;inset:0;pointer-events:none}.pp-cc-gradient-1{background:linear-gradient(160deg,#20162c,#0c0b0d 48%)}.pp-cc-gradient-2{background:radial-gradient(circle at 90% 2%,#9c4cb62e,transparent 35%)}.pp-cc-gradient-3{background:linear-gradient(180deg,transparent 60%,#49346833)}.profile-character-card-stack{position:relative;z-index:1;display:flex;min-height:100%;flex-direction:column}.profile-character-card-stack-link-component{color:inherit;text-decoration:none}.profile-character-card-stack-link-component-box{position:relative}.profile-character-card-name-box{min-height:44px;padding:10px 9px;color:#ef83ed;font-size:12px;font-weight:800;line-height:1.25}.profile-character-card-stats-box{position:absolute;z-index:2;top:43px;right:0}.profile-character-card-ribbon{padding:4px 7px;color:white;background:#6f4a90;border-radius:4px 0 0 4px;font-size:10px;font-weight:800}.profile-character-card-avatar-aspect-ratio{position:relative;aspect-ratio:1/1;overflow:hidden}.profile-character-card-avatar-image{display:block;width:100%;height:100%;object-fit:cover;object-position:top}.profile-character-card-creator-name-link{display:block;padding:9px 10px 4px;color:#c7a9ed;text-decoration:none;font-size:11px;font-weight:800}.profile-character-card-description-box{min-height:76px;padding:0 10px;color:#d9d2e1}.profile-character-card-description-markdown-container{font-size:11px;line-height:1.45;text-align:center}.profile-character-card-description-markdown-container p{margin:7px 0}.profile-character-card-star-line{position:relative;width:80%;margin:8px auto;border-top:1px solid #b49ad8}.profile-character-card-star{position:absolute;right:-7px;top:-10px;color:#e6d5ff}.profile-character-card-tags{display:flex;flex-wrap:wrap;gap:5px;margin:0;padding:7px 9px 12px;list-style:none}.profile-character-card-tags-wrap{display:flex}.profile-character-card-tags-item{display:inline-flex;min-height:21px;align-items:center;padding:3px 7px;color:#e7dcf2;background:#2d2338;border:1px solid #705e87;border-radius:5px;font-size:9px;line-height:1.1}.profile-character-card-box{margin-top:auto;padding:0 9px 10px}.profile-character-card-tokens-count{margin:0;color:#afa6b7;text-align:center;font-size:10px}
.pp-footer{position:absolute;z-index:20;right:0;bottom:0;left:0;min-height:50px;display:flex;align-items:center;justify-content:space-between;gap:15px;padding:12px 7%;color:#aaaab0;background:#17171acc;font-size:11px}.pp-footer a{color:#a98ce0;text-decoration:none}.footer-links{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px}@media(max-width:900px){.profile-page-flex{flex-direction:column}.profile-uc-background{width:100%;min-width:0}.profile-page-container-flex-box{width:100%}.profile-top-bar-create-char{display:none}}@media(max-width:620px){.profile-top-bar-search-wrapper{display:none}.profile-page-container{padding:16px 12px 96px}.profile-info-hstack{align-items:flex-start}.profile-avatar{width:105px;height:105px}.profile-title-heading{font-size:22px}.character-list-pagination-flex{align-items:stretch;flex-direction:column}.profile-filters-flex-outer{justify-content:flex-start}.profile-character-search-input-group{min-width:0;flex:1}.pp-cc-list-container{justify-content:center}.pp-footer{align-items:flex-start;flex-direction:column}.footer-links{justify-content:flex-start}}
`;

const previewCards=[
  {name:"The Most Popular Gyaru on Campus Got Kicked Out of Her Dorm, And Somehow She’s Your Problem Now",description:'“Unfortunately for you, university housing decided the best place to send her was your dorm.”',chats:"3.1k",tokens:"9.7k tokens",image:"https://ella.janitorai.com/bot-avatars/3zBxhSmil0gO9au2yqOyN.webp?width=400",tags:["Limitless","👩‍🦰 Female","⛓️ Dominant","👤 AnyPOV","💔 Angst","#gyaru","#roommate"]},
  {name:"She Can End Worlds, Yet She’d Rather Tease You.",description:"“The sun does not disappear. It simply learns when to hide.”",chats:"205",tokens:"10k tokens",image:"https://ella.janitorai.com/bot-avatars/KXMHc-axraFuvGvz9DceA.webp?width=400",tags:["Limitless","🧑‍🎨 OC","🔮 Magical","👭 Multiple","🌗 Switch","#eclipse"]},
  {name:"You reached the First Flame. Every Lord who linked it now stands in your way.",description:"“The First Flame gutters at the end of the world. Before its fate can be decided…”",chats:"18",tokens:"5.8k tokens",image:"https://ella.janitorai.com/bot-avatars/YV66dgaMo20RNiya7WeoW.webp?width=400",tags:["Limitless","📚 Fictional","🎮 Game","🦄 Non-human","🕊 Dead Dove","#soulofcinder"]},
];

const cleanPreviewMarkup=(value:string)=>value
  .replace(/<script\b[\s\S]*?<\/script>/gi,"")
  .replace(/\son\w+\s*=\s*(["']).*?\1/gi,"")
  .replace(/javascript:/gi,"");

export function previewDocumentV7(css:string,c:StudioConfig,w:Widgets,htmlOverride?:string){
  const generatedHtml=generateHtml(w);
  const profileHtml=cleanPreviewMarkup(htmlOverride===undefined?generatedHtml:htmlOverride);
  const cards=previewCards.map(card=>`<article class="pp-cc-wrapper profile-character-card-wrapper"><div class="pp-cc-gradient-1"></div><div class="pp-cc-gradient-2"></div><div class="pp-cc-gradient-3"></div><div class="profile-character-card-stack"><a class="profile-character-card-stack-link-component"><div class="profile-character-card-stack-link-component-box"><div class="pp-cc-name profile-character-card-name-box">${escapeHtml(card.name)}</div><div class="profile-character-card-stats-box"><div class="pp-cc-ribbon profile-character-card-ribbon"><span class="pp-cc-chats-count profile-character-card-chats-count">◫ ${card.chats}</span></div></div><div class="profile-character-card-avatar-aspect-ratio"><img class="pp-cc-avatar profile-character-card-avatar-image" src="${card.image}" alt="${escapeHtml(card.name)}"></div></div></a><a class="profile-character-card-creator-name-link"><span class="pp-cc-creator-name profile-character-card-creator-name-box">@Patchies</span></a><div class="profile-character-card-description-box"><div class="pp-cc-description profile-character-card-description-markdown-container"><p>${escapeHtml(card.description)}</p></div></div><div class="pp-cc-star-line profile-character-card-star-line"><span class="pp-cc-star profile-character-card-star">✦</span></div><ul class="pp-cc-tags profile-character-card-tags">${card.tags.map((tag,index)=>`<li class="pp-cc-tags-wrap profile-character-card-tags-wrap"><span class="pp-cc-tags-item profile-character-card-tags-item ${index===0?"profile-character-card-tag-limitless":""}">${escapeHtml(tag)}</span></li>`).join("")}</ul><div class="profile-character-card-box"><p class="pp-cc-tokens-count profile-character-card-tokens-count">${card.tokens}</p></div></div></article>`).join("");
  return `<!doctype html><html data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${REAL_PREVIEW_BASE}</style><style>${unwrap(css)}</style></head><body><header class="profile-top-bar-flex-outer pp-top-bar-outer"><div class="pp-top-bar profile-top-bar pp-top-bar-inner"><div class="pp-top-bar-left profile-top-box-flex-inner"><a class="profile-top-bar-logo-box"><h2 class="pp-top-bar-logo-name profile-top-bar-logo-name">janitor</h2><p class="pp-top-bar-logo-sub-name profile-top-bar-logo-sub-name">beta</p></a><div class="profile-top-bar-search-wrapper"><div class="profile-top-bar-search-box"><span>⌕</span><span class="pp-top-bar-search profile-top-bar-search">Search for characters or creators</span></div></div></div><div class="pp-top-bar-right"><a class="pp-top-bar-create-char profile-top-bar-create-char">Create a Character</a><span class="top-icon">◇</span><span class="top-icon">P</span></div></div></header><main class="chakra-stack profile-page-container"><div class="pp-page-background profile-page-background"></div><div class="profile-page-flex"><aside class="pp-uc-background profile-uc-background profile-uc-background-flex"><div class="profile-background-box-1"></div><div class="profile-background-box-2"></div><div class="profile-background-box-3"></div><div class="profile-info-wrapper-box"><div class="profile-info-stack"><div class="profile-info-hstack"><div class="pp-uc-avatar-container profile-avatar-container"><img class="pp-uc-avatar profile-avatar" src="https://ella.janitorai.com/profile-avatar-approved/dcd2b665-d438-45eb-8da5-41b0744040b7/1618090/U8rOpWYaghRMtKflpx2z5.webp" alt="Patchies profile avatar"></div><div class="profile-info-stack-inner"><div class="profile-info-stack-inner-flex"><h1 class="pp-uc-title profile-title-heading">@Patchies</h1></div><div class="pp-uc-followers-count profile-followers-count">12 followers</div><div class="pp-uc-member-since profile-member-since-box">Member Since May 9, 2026</div></div></div><div class="pp-uc-about-me profile-about-me">${profileHtml}</div><button class="Btn pp-uc-follow-button profile-uc-follow-button"><span class="pp-uc-follow-text profile-uc-follow-text">Follow</span></button></div></div></aside><section class="profile-page-container-flex-box"><div class="profile-tabs-chakra-tabs"><div class="pp-tabs-wrapper profile-tabs-wrapper"><button class="pp-tabs-button profile-tabs-button" aria-selected="true">Characters</button><i class="pp-tabs-indicator profile-tabs-indicator"></i></div><div class="pp-tabs-panels profile-tabs-panels"><div class="profile-tab-panel"><div class="characters-list-container-flex"><div class="character-list-pagination-flex"><span class="profile-badge-flex-outer">3 characters</span><div class="profile-filters-flex-outer"><div class="profile-filters-flex-inner-hassearchfilter profile-character-search-input-group"><input class="pp-fl-search-input profile-character-search-input" placeholder="Search for characters"></div><button class="pp-fl-filter-button profile-filter-button">▽</button><button class="transparent sort-control">Latest⌄</button></div></div><div class="pp-cc-list-container">${cards}</div></div></div></div></div></section></div></main><footer class="pp-footer"><span><b>janitor</b> — Build, share, and explore!</span><span class="footer-links"><a>careers</a><a>news</a><a>status</a><a>guidelines</a><a>safety</a><a>terms</a><a>support</a></span></footer></body></html>`;
}
