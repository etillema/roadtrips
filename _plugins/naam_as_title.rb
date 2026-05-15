Jekyll::Hooks.register :documents, :pre_render do |doc|
  if doc.data['naam'] && doc.data['title'].nil?
    doc.data['title'] = doc.data['naam']
  end
end
