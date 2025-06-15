// API service for fetching data from WordPress and Laravel endpoints

const WORDPRESS_API_BASE = '/api-wordpress';
const LARAVEL_API_BASE = '/api-laravel';

// WordPress/FreelanceEngine API calls
export const fetchProjects = async () => {
  try {
    const response = await fetch(`${WORDPRESS_API_BASE}/wp/v2/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    
    // Transform WordPress data to our format
    return data.map((project: any) => ({
      id: project.id.toString(),
      title: project.title.rendered,
      organization: project.acf?.organization || 'Unknown Organization',
      description: project.excerpt.rendered.replace(/<[^>]*>/g, ''),
      location: project.acf?.location || 'Location TBD',
      skills_needed: project.acf?.skills_needed || [],
      urgency: project.acf?.urgency || 'medium',
      budget: project.acf?.budget || 'Budget TBD',
      posted_date: project.date,
      lat: project.acf?.latitude,
      lng: project.acf?.longitude
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchTechStewards = async () => {
  try {
    const response = await fetch(`${WORDPRESS_API_BASE}/wp/v2/tech-stewards`);
    if (!response.ok) {
      throw new Error('Failed to fetch tech stewards');
    }
    const data = await response.json();
    
    // Transform WordPress data to our format
    return data.map((steward: any) => ({
      id: steward.id.toString(),
      name: steward.title.rendered,
      location: steward.acf?.location || 'Location TBD',
      specialties: steward.acf?.specialties || [],
      rating: steward.acf?.rating || 4.5,
      reviews_count: steward.acf?.reviews_count || 0,
      verified: steward.acf?.verified || false,
      availability: steward.acf?.availability || 'Contact for availability',
      bio: steward.content.rendered.replace(/<[^>]*>/g, ''),
      lat: steward.acf?.latitude,
      lng: steward.acf?.longitude
    }));
  } catch (error) {
    console.error('Error fetching tech stewards:', error);
    throw error;
  }
};

// Blog posts API call
export const fetchBlogPosts = async (params?: { per_page?: number; search?: string; categories?: string }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.categories) queryParams.append('categories', params.categories);
    queryParams.append('_embed', 'true');

    const response = await fetch(`${WORDPRESS_API_BASE}/wp/v2/posts?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Laravel HR API calls
export const submitTechHubApplication = async (applicationData: any) => {
  try {
    const response = await fetch(`${LARAVEL_API_BASE}/tech-hub-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(applicationData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit application');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting tech hub application:', error);
    throw error;
  }
};

export const fetchTechHubData = async () => {
  try {
    const response = await fetch(`${LARAVEL_API_BASE}/tech-hubs`);
    if (!response.ok) {
      throw new Error('Failed to fetch tech hub data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tech hub data:', error);
    throw error;
  }
};

// E-waste pickup scheduling
export const scheduleEWastePickup = async (pickupData: any) => {
  try {
    const response = await fetch(`${LARAVEL_API_BASE}/ewaste-pickups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pickupData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to schedule pickup');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error scheduling e-waste pickup:', error);
    throw error;
  }
};

// Contact form submissions
export const submitContactForm = async (contactData: any) => {
  try {
    const response = await fetch(`${LARAVEL_API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Donation processing
export const processDonation = async (donationData: any) => {
  try {
    const response = await fetch(`${LARAVEL_API_BASE}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(donationData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to process donation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error processing donation:', error);
    throw error;
  }
};