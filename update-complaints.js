const fs = require('fs');
const path = 'c:/Users/Pranav/Desktop/Smart Bharat AI/src/app/complaints/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add onClick handlers
content = content.replace(/<button  className=\"glass-card[\s\S]*?<h3 className=\"font-body-md[^\"]+\">([^<]+)<\/h3>/g, (match, category) => {
  return match.replace('<button  className=\"glass-card', `<button onClick={() => setSelectedCategory("${category}")} className=\"glass-card`);
});

// Add dropdown box below the grid
const gridEnd = `          </div>\n        </section>`;
const dropdownHtml = `          </div>\n
          {/* Subcategory Dropdown */}
          {selectedCategory && SUBCATEGORIES[selectedCategory] && (
            <div className="mt-8 max-w-4xl mx-auto w-full animate-fade-in">
              <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 border-primary/20 shadow-[0_8px_32px_rgba(37,99,235,0.05)]">
                <label className="text-sm font-medium text-on-surface-variant">Select specific issue for {selectedCategory}</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface-container/50 border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer">
                    <option value="" disabled selected>Choose a specific issue...</option>
                    {SUBCATEGORIES[selectedCategory].map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
                <div className="flex justify-end mt-2">
                   <button className="bg-primary text-on-primary px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                     Proceed to Submit
                   </button>
                </div>
              </div>
            </div>
          )}
        </section>`;

content = content.replace(gridEnd, dropdownHtml);
fs.writeFileSync(path, content, 'utf8');
