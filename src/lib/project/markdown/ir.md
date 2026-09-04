---
name: ir
description: Work in progress Odin CLAP plugin with bindings for Rust slint components.
technologies: ["Rust", "Docker"]
publishedDate: "2026-09-03"
github: "cykreet/ir"
---

Odin's been of particular interest to me recently as someone who's been getting more and more into lower level and "performance-oriented" programming. I appreciate the thought behind a lot the language semantics (which is to say I appreciate a lot the decisions behind jai that inspired it). I think the spectrum of low level languages is pretty exciting at the moment, though I'm still learning and exploring. I've also enjoyed languages like Rust quite a bit, so being able to possibly append Odin (and possibly some others like Zig) to my toolbelt is something I'm excited about.

I came across this [convolution plugin that does some cool stuff with impulse responses](https://viiri-audio.com) after browsing [slint's](https://slint.dev) project showcase and it inspired me to try slint, while also using Odin, to throw together a plugin of my own I could possibly use in my own projects. Before getting to actually write the plugin part, I've had to address a few hiccups:

1. slint is written in Rust, and I wanted to use Odin for the plugin, so I needed to write some bindings for slint's components.
2. CLAP is a C API, and I wanted to use Odin for the plugin, so I needed to write some bindings for CLAP (this has been done before, but I wanted something automated and properly versioned, if I find a better solution, I may switch to that instead).
3. (to be addressed) Ableton Live is my go-to DAW, and it doesn't support CLAP yet (for some reason), so I may need a wrapper for VST3. free-audio does have a [VST3 wrapper for CLAP](https://github.com/free-audio/clap-wrapper), but I have yet to test it.

These aren't absolute blockers and I've taken care of the most important ones, so I'll be looking into actually doing some impulse response convolution in the near future.

### odin clap bindings

Definitely not the first of its kind, but as someone who has been getting more into Odin and audio programming, I wanted to make a simple wrapper for the CLAP audio library, which automatically runs binding generation every week using [`odin-c-bindgen`](https://github.com/karl-zylinski/odin-c-bindgen).

The final bindings are generated as a result of the following process:

1. Clone clap, as previously mentioned.
2. A set of "footers" are contained in `bindings/footers` which are manually maintained files that include constants from the original header files, these aren't normally included in the bindings generated with `odin-c-bindgen`. The footer files are copied next to the source header files, `odin-c-bindgen` finds these and inserts their content near the bottom of the generated odin file.
3. We then generate the bindings with `odin-c-bindgen`, which outputs the odin files to the root of the repository.
4. 2 branches are setup for the pull request: `{version}` and `{version}-candidate`, where `{version}-candidate` contains the bindings to be merged into `{version}`.

From the pull request, we run build validation with the files from `test/`, and then validate the produced `clap` plugin with [`clap-validator`](https://github.com/free-audio/clap-validator). This produces a small report containing the performed test results, which can be used for review. Once merged -- we create a tagged release, stripped of any non-bindings related files (like .git, bin, test, etc.).