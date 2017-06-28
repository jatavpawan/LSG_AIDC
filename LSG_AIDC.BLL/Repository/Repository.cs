

namespace LSG_AIDC.BLL.Repository
{
    using LSG_AIDC.BLL.Interface;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using LSG_AIDC.DAL;
    using System.Data.Entity;
    using System.Linq.Expressions;
    using System.Data.Entity.Infrastructure;
    public class Repository<T> : IRepository<T>, IDisposable where T : class
    {

        /// <summary>
        /// set endmx in datacontext
        /// </summary>
        /// <param name="dbContext">entity framework name</param>

        public LSG_AIDCEntities DbContext { get; set; }

        protected DbSet<T> DbSet { get; set; }

        public Repository(LSG_AIDCEntities dbContext)
        {
            if (dbContext == null)
                throw new ArgumentNullException("Null DbContext");
            DbContext = dbContext;
            DbSet = DbContext.Set<T>();

        }

        public Repository()
        {
            DbContext = new LSG_AIDCEntities();
            DbSet = DbContext.Set<T>();
        }

        //public virtual IQueryable<T> GetAll()
        //{
        //    return DbSet;
        //}

        /// <summary>
        /// Get all record as a list   
        /// </summary>
        ///    /// <returns>list </returns>      

        public virtual IEnumerable<T> GetAll()
        {

            return DbSet.ToList();

            //return DbSet.ToList();
        }


        /// <summary>
        /// Retrieve all records from context for a given type
        /// </summary>
        /// <returns></returns>
        public virtual IQueryable<T> RetrieveAll()
        {
            return this.DbContext.Set<T>();
        }


        /// <summary>
        /// Performs a search on the supplied string property
        /// </summary>
        /// <param name="stringProperty">Property to search upon</param>
        /// <param name="searchTerm">Search term</param>
        public virtual IQueryable<T> Search(Expression<Func<T, string>> stringProperty, string searchTerm)
        {

            var source = this.RetrieveAll();

            if (String.IsNullOrEmpty(searchTerm))
            {
                return source;
            }

            //Create expression to represent T.[property] != null
            var isNotNullExpression = Expression.NotEqual(stringProperty.Body, Expression.Constant(null));

            //Create expression to represent T.[property].Contains(searchTerm)
            var searchTermExpression = Expression.Constant(searchTerm);
            var checkContainsExpression = Expression.Call(stringProperty.Body, typeof(string).GetMethod("Contains"), searchTermExpression);

            //Join not null and contains expressions
            var notNullAndContainsExpression = Expression.AndAlso(isNotNullExpression, checkContainsExpression);

            //Build final expression
            var methodCallExpression = Expression.Call(typeof(Queryable),
                                                       "Where",
                                                       new Type[] { source.ElementType },
                                                       source.Expression,
                                                       Expression.Lambda<Func<T, bool>>(notNullAndContainsExpression, stringProperty.Parameters));

            return source.Provider.CreateQuery<T>(methodCallExpression);

        }


        /// <summary>
        /// Performs a search and get result using int id
        /// </summary>
        /// <param name="id">primary key(int)</param>

        public virtual T GetById(int id)
        {
            return DbSet.Find(id);
        }

        /// <summary>
        /// Performs add(insert) operation 
        /// </summary>
        /// <param name="entity">model class</param>
        public virtual void Add(T entity)
        {

            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);

            if (dbEntityEntry.State == EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
                DbContext.SaveChanges();

            }
            else
            {
                DbSet.Add(entity);

            }

        }


        /// <summary>
        /// Performs update operation 
        /// </summary>
        /// <param name="entity">model class</param>
        public virtual void Update(T entity)
        {

            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Modified)
            {
                DbSet.Attach(entity);
            }

            dbEntityEntry.State = EntityState.Modified;
            DbContext.SaveChanges();

        }

        /// <summary>
        /// Performs delete operation 
        /// </summary>
        /// <param name="entity">model class</param>
        public virtual void Delete(T entity)
        {

            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Deleted)
            {
                dbEntityEntry.State = EntityState.Deleted;
            }
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
            DbContext.SaveChanges();
        }

        /// <summary>
        /// Performs delete operation  based on primary key id
        /// </summary>
        /// <param name="id">primary key-id</param>
        public virtual void Delete(int id)
        {
            var entity = GetById(id);
            if (entity == null) return; // not found; assume already deleted.
            Delete(entity);

        }

        /// <summary>
        /// Performs searching and filtring operation 
        /// </summary>
        /// <param name="filter">bool value</param>
        /// <param name="orderBy">use for ordening</param>
        /// <param name="includeProperties">include value </param>

        public virtual IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
        {
            IQueryable<T> query = DbSet;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            //return query.ToList();
            foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }

        }

        /// <summary>
        /// Performs searching  based on single paramter
        /// </summary>
        /// <param name="filter">any one parameter(column name, value)</param>

        public virtual IQueryable<T> Query(Expression<Func<T, bool>> filter = null)
        {

            IQueryable<T> query = DbContext.Set<T>();

            if (filter != null)
                query = query.Where(filter);

            return query;


        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    DbContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public virtual void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
