#!/bin/zsh
#
# Lance Gradle pour l'app Android avec le JDK 21 requis par Capacitor 8.
# Cherche le JDK dans cet ordre :
#   1. $RENTX_JDK21  (chemin explicite)
#   2. Homebrew :   $(brew --prefix openjdk@21)
#   3. JVM système : /usr/libexec/java_home -v 21
#
# Usage : scripts/android-gradle.sh <tâche-gradle>   (ex. assembleDebug)

set -euo pipefail

JDK21="${RENTX_JDK21:-}"

if [[ -z "$JDK21" && -x "$(command -v brew)" ]]; then
  JDK21="$(brew --prefix openjdk@21 2>/dev/null)/libexec/openjdk.jdk/Contents/Home"
fi

if [[ -z "$JDK21" || ! -x "$JDK21/bin/java" ]]; then
  JDK21="$(/usr/libexec/java_home -v 21 2>/dev/null || true)"
fi

if [[ -z "${JDK21:-}" || ! -x "$JDK21/bin/java" ]]; then
  echo "ERREUR : JDK 21 introuvable." >&2
  echo "Capacitor 8 l'exige. Installez-le avec :  brew install openjdk@21" >&2
  echo "ou définissez RENTX_JDK21=/chemin/vers/JDK21/Contents/Home" >&2
  exit 1
fi

export JAVA_HOME="$JDK21"
cd "$(dirname "$0")/../android"
./gradlew "$@"
