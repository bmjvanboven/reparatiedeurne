/**
 * Toolbox modelKey -> pad naar een productfoto in /public/devices.
 * De Toolbox zelf slaat geen foto's op bij een reparatiemodel, dus dit is een
 * losse, handmatig bij te werken koppeltabel. Staat een toestel er niet in,
 * dan toont de kaart automatisch het generieke merk-icoon (zie DeviceIcon).
 *
 * Voorbeeld zodra er een foto in /public/devices/ip16.png staat:
 *   ip16: "/devices/ip16.png",
 */
export const DEVICE_IMAGES: Record<string, string> = {};

export function afbeeldingVoor(modelKey: string): string | null {
  return DEVICE_IMAGES[modelKey] ?? null;
}
