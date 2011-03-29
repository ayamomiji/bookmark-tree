task :default => [:clean, :build]

# To run the build task, you should install these packages:
# gem: compass
# npm: coffee-script
task :build do
  sh 'compass compile'
  Dir.glob('*.coffee') do |f|
    sh "coffee -c #{f}"
  end
  mkdir 'bookmark-tree' if not Dir.exists? 'bookmark-tree'
  sh 'cp -r _locales *.json *.md *.png *.css *.js *.html bookmark-tree'
end

task :clean do
  sh 'rm -r bookmark-tree' if Dir.exists? 'bookmark-tree'
end
