export const fetchCategories = `*[_type == "category"] | order(name asc)`;

export const SearchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match "${searchTerm}*" ||
                "${searchTerm}"  in category 
                || about match "${searchTerm}*"] | order(_createdAt desc) {
                    image {
                        asset -> {
                            url
                        }
                    },
                    _id,
                    title,
                    category,
                    postedBy -> {
                        _id,
                        userName,
                        image
                    },
                    save[] {
                        _key,
                        postedBy -> {
                            _id,
                            userName,
                            image
                        },
                    },
                }`;
    return query
}

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    title,
    category,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`;


export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == "${pinId}"] {
      image {
          asset -> {
              url
          }
      },
      _id,
      title,
      about,
      category,
      postedBy -> {
          _id,
          userName,
          image
      },
      save[] {
          _key,
          postedBy -> {
              _id,
              userName,
              image
          },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;

    return query
}

export const pinDetailMorePinQuery = (pin) => {
  let _query = ``
  for (let i = 0; i < pin.category.length; i++) {
    _query += `"${pin.category[i]}"  in category `
    if (i === pin.category.length -1){
      _query+= `&& `
    } else {
      _query +=`|| `
    }

  }

  const query = `*[_type == "pin" && ${_query} _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    title,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || '${searchTerm}' in category || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;

  return query
}

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
