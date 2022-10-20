﻿using api.Models;
using System.Linq.Expressions;

namespace api.Data
{
    // Defines a generic interface that is used by a repository instance.
    public interface IRepository<T> where T : IDBEntity<T>
    {
        public Task<T?> Get<Key>(Key id);
        IEnumerable<T> GetAll();
        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        public void Create(T obj);

        public void Create(IEnumerable<T> objects);

        public void Update(T obj);

        public void Remove(T obj);
        public void Remove(IEnumerable<T> obj);

        public void Save();
    }
}
