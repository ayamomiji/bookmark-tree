# vim:ft=ruby

def run(cmd)
  puts("$ #{cmd}")
  system(cmd)
end

def coffee(file)
  run "coffee -c #{file}"
end

def haml(file)
  target = file.dup
  target['.haml'] = '.html'
  run "haml #{file} > #{target}"
end

def compass
  run 'compass compile'
end

def compile_all
  Dir.glob('*.coffee') { |f| coffee(f) }
  Dir.glob('*.haml') { |f| haml(f) }
  compass
end

# --------------------------------------------------
# Watchr Rules
# --------------------------------------------------
watch("^(.*).coffee") { |m| coffee("#{m[1]}.coffee") }
watch("^(.*).haml")   { |m| haml("#{m[1]}.haml") }
watch("^(.*).scss")   { |m| compass }

# --------------------------------------------------
# Signal Handling
# --------------------------------------------------
# Ctrl-\
Signal.trap('QUIT') do
  puts '--- Running all specs ---'
  compile_all
end

# Ctrl-C
Signal.trap('INT') { abort("\n") }
