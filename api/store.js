export default async function handler(req, res) {
  const { userId, page = 1, limit = 50 } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  try {
    const response = await fetch(
      `https://api.polytoria.com/v1/users/${userId}/store?page=${page}&limit=${limit}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
          'Accept': 'application/json,*/*',
          'Referer': 'https://api.polytoria.com/',
          'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"'
        }
      }
    );
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: 'Failed to fetch from Polytoria API',
        status: response.status,
        statusText: response.statusText
      });
    }
    
    const data = await response.json();
    const categories = {};
    
    if (data.assets) {
      data.assets.forEach(asset => {
        const type = asset.type.toUpperCase();
        if (!categories[type]) {
          categories[type] = [];
        }
        categories[type].push({
          id: asset.id,
          name: asset.name,
          price: asset.price || 'Free',
          thumbnail: asset.thumbnail
        });
      });
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.status(200).json({
      userId: parseInt(userId),
      total: data.total || 0,
      categories
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
