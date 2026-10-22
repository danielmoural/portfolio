const openClass = "maplibregl-compact-show";
const closingClass = "attribution-closing";

// MapLibre closes its compact attribution at once, from its button and on
// drag, by dropping a class. This holds it open while the fold animation in
// globals.css plays, then closes it the way MapLibre would
export function foldAttributionOnClose(attribution: HTMLDetailsElement) {
  function close() {
    if (
      !attribution.classList.contains(openClass) ||
      attribution.classList.contains(closingClass)
    ) {
      return;
    }
    attribution.open = true;
    attribution.classList.add(closingClass);
    observer.takeRecords();

    // Resolves at once when reduced motion leaves nothing to animate, and
    // rejects if the fold is cancelled by reopening
    const animations = attribution.getAnimations({ subtree: true });
    Promise.all(animations.map((animation) => animation.finished)).then(
      () => {
        if (!attribution.classList.contains(closingClass)) return;
        attribution.classList.remove(closingClass, openClass);
        attribution.open = false;
        observer.takeRecords();
      },
      () => {},
    );
  }

  // Catches MapLibre's own closing on drag, putting the class back so the
  // credit stays drawn while it folds
  const observer = new MutationObserver((records) => {
    const dropped =
      !attribution.classList.contains(openClass) &&
      records.some((record) => record.oldValue?.split(" ").includes(openClass));
    if (!dropped) return;
    attribution.classList.add(openClass);
    observer.takeRecords();
    close();
  });
  observer.observe(attribution, {
    attributeFilter: ["class"],
    attributeOldValue: true,
  });

  // Captured ahead of MapLibre's handler and the native <details> toggle,
  // which would both close it on the spot
  function handleClick(event: MouseEvent) {
    if (
      !(event.target instanceof Element) ||
      !event.target.closest(".maplibregl-ctrl-attrib-button")
    ) {
      return;
    }
    if (attribution.classList.contains(closingClass)) {
      // Clicked again mid-fold, so it stays open
      attribution.classList.remove(closingClass);
      observer.takeRecords();
    } else if (attribution.classList.contains(openClass)) {
      close();
    } else {
      // Opening is left to MapLibre
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }
  attribution.addEventListener("click", handleClick, { capture: true });

  return {
    close,
    disconnect() {
      observer.disconnect();
      attribution.removeEventListener("click", handleClick, { capture: true });
    },
  };
}
